import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const admin = await User.findOne({ email, role: 'admin' }).select('+password');
    if (!admin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const res = NextResponse.json({ message: 'Login successful' });
    res.cookies.set('admin', admin._id.toString(), {
      httpOnly: true,
      path: '/',
    });

    return res;
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
