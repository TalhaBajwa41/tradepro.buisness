import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const employees = await User.find({ role: 'user' }).select('-password');
  return NextResponse.json(employees);
}
