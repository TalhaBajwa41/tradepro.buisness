import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully'
      },
      { status: 200 }
    );

    // Clear the authentication cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Logout failed'
      },
      { status: 500 }
    );
  }
}