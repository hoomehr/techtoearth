import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';

export async function GET() {
  try {
    await dbConnect();
    const successStories = await SuccessStory.find({}).sort({ id: 1 }).lean();
    return NextResponse.json({ successStories });
  } catch (error) {
    console.error('Error fetching success stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch success stories' },
      { status: 500 }
    );
  }
}
