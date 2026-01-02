import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/app/models/user';
import { connectDB } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(req) {
  try {
    await connectDB();

    // Get token from cookie
    const token = req.cookies.get('token')?.value;

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
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from database
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

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          profileImage: user.profileImage,
          portfolio: user.portfolio,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get User Error:', error);
    
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
        message: 'Server error'
      },
      { status: 500 }
    );
  }
}