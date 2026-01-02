// app/api/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/app/models/user';
import { connectDB } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-min-32-chars';

export async function POST(req) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const { email, password } = await req.json();

    // Validation - Check if fields are provided
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Email and password are required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }

    // Find user by email and include password field (normally excluded)
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Verify password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token with user info
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Prepare user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage,
      portfolio: user.portfolio,
      lastLogin: user.lastLogin
    };

    // Create response with user data and token
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: userData,
        token
      },
      { status: 200 }
    );

    // Set HTTP-only cookie with JWT token for additional security
    response.cookies.set('authToken', token, {
      httpOnly: true, // Cannot be accessed by JavaScript (XSS protection)
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/' // Available across entire site
    });

    return response;

  } catch (error) {
    console.error('❌ Login Error:', error);
    
    // Handle JWT errors
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Authentication error' 
        },
        { status: 401 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { 
        success: false,
        message: 'Server error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}