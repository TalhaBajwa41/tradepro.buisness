import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/user';
import { connectDB } from '@/lib/db';

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false,
          message: 'All fields are required' 
        },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Name must be at least 2 characters' 
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

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Password must be at least 6 characters' 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false,
          message: 'An account with this email already exists' 
        },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // Return success response (without password)
    return NextResponse.json(
      { 
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration Error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { 
          success: false,
          message: messages[0] || 'Validation error'
        },
        { status: 400 }
      );
    }

    // Handle duplicate key error (shouldn't happen due to check above, but just in case)
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false,
          message: 'An account with this email already exists'
        },
        { status: 409 }
      );
    }

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