import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { id, name, email, bio, location } = await request.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the user by ID
    const user = await User.findOne({ id: id });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;

    // Save the updated user
    await user.save();

    // Return the updated user without sensitive data
    const updatedUser = user.toObject();
    delete updatedUser.password;

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while updating the profile' },
      { status: 500 }
    );
  }
}
