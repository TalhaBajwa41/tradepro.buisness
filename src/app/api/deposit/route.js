// app/api/deposit/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import Deposit from '@/app/models/deposit';
import User from '@/app/models/user';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper function to convert file to base64
async function fileToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

// POST: Submit new deposit request
export async function POST(req) {
  try {
    await connectDB();

    // Get token from cookie
    const token = req.cookies.get('authToken')?.value;

    console.log('🔍 Debug - Cookie check:', {
      hasCookie: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'none'
    });

    if (!token) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Not authenticated' 
        },
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      console.log('✅ Token verified:', { userId: decoded.userId });
    } catch (error) {
      console.error('❌ Token verification failed:', error.message);
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid token' 
        },
        { status: 401 }
      );
    }

    // Validate userId is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid user ID' 
        },
        { status: 400 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    
    const amount = formData.get('amount');
    const paymentMethod = formData.get('paymentMethod');
    const transactionId = formData.get('transactionId');
    const screenshot = formData.get('screenshot');

    // Validate required fields
    if (!amount || !transactionId || !screenshot) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'All fields are required' 
        },
        { status: 400 }
      );
    }

    // Validate amount
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount < 100) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Minimum deposit amount is PKR 100' 
        },
        { status: 400 }
      );
    }

    // Validate screenshot file
    if (!screenshot || screenshot.size === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Payment screenshot is required' 
        },
        { status: 400 }
      );
    }

    // Check file size (max 5MB)
    if (screenshot.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Screenshot file size must be less than 5MB' 
        },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(screenshot.type)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Only JPEG, PNG, and WebP images are allowed' 
        },
        { status: 400 }
      );
    }

    // Sanitize transaction ID
    const sanitizedTransactionId = transactionId.trim().replace(/[^\w\s-]/gi, '');

    // Check for duplicate transaction ID
    const existingDeposit = await Deposit.findOne({ 
      transactionId: sanitizedTransactionId 
    });

    if (existingDeposit) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'This transaction ID has already been used' 
        },
        { status: 400 }
      );
    }

    // Convert screenshot to base64
    const screenshotBase64 = await fileToBase64(screenshot);

    // Verify user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          message: 'User not found' 
        },
        { status: 404 }
      );
    }

    // Create deposit record
    const deposit = new Deposit({
      userId: decoded.userId,
      amount: depositAmount,
      paymentMethod: paymentMethod || 'jazzcash',
      transactionId: sanitizedTransactionId,
      screenshot: screenshotBase64,
      status: 'pending'
    });

    await deposit.save();

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Deposit request submitted successfully',
      deposit: {
        _id: deposit._id,
        amount: deposit.amount,
        transactionId: deposit.transactionId,
        paymentMethod: deposit.paymentMethod,
        status: deposit.status,
        createdAt: deposit.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Deposit submission error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: Object.values(error.errors).map(err => err.message)
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit deposit request',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
      },
      { status: 500 }
    );
  }
}

// GET: Get user's deposit history
export async function GET(req) {
  try {
    await connectDB();

    // Get token from cookie
    const token = req.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Not authenticated' 
        },
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid token' 
        },
        { status: 401 }
      );
    }

    // Validate userId is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid user ID' 
        },
        { status: 400 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    const query = { userId: decoded.userId };
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count
    const totalCount = await Deposit.countDocuments(query);

    // Get deposits
    const deposits = await Deposit.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('approvedBy', 'name email')
      .lean();

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);

    // Calculate total amounts by status
    const totals = await Deposit.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(decoded.userId) } },
      {
        $group: {
          _id: '$status',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const summary = {
      pending: { total: 0, count: 0 },
      approved: { total: 0, count: 0 },
      rejected: { total: 0, count: 0 }
    };

    totals.forEach(item => {
      summary[item._id] = {
        total: item.total,
        count: item.count
      };
    });

    return NextResponse.json({
      success: true,
      deposits,
      summary,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Get deposits error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid token' 
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to retrieve deposit history',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
      },
      { status: 500 }
    );
  }
}