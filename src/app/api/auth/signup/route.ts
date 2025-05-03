import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already in use' },
        { status: 400 }
      );
    }

    // Get the highest user ID to create a new one
    const highestUser = await User.findOne().sort({ id: -1 }).lean();
    const newId = highestUser ? highestUser.id + 1 : 1;

    // Create new user
    // In a real app, you would hash the password before storing it
    const newUser = new User({
      id: newId,
      name,
      email,
      password, // Store the password (should be hashed in production)
      avatar: `https://placehold.co/300x300/4B7F52/FFFFFF?text=${name.charAt(0)}`,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      enrolledCourses: [],
      savedEvents: [],
      joinedGroups: [],
      savedResources: []
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: 'Account created successfully'
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
