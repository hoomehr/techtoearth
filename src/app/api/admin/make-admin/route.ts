import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update the user to be an admin
    user.isAdmin = true;
    await user.save();

    return NextResponse.json({
      success: true,
      message: `User ${email} is now an admin`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Error making user admin:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while making the user an admin' },
      { status: 500 }
    );
  }
}
