import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const storyId = parseInt(params.id);
    const story = await SuccessStory.findOne({ id: storyId }).lean();
    
    if (!story) {
      return NextResponse.json(
        { error: 'Success story not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(story);
  } catch (error) {
    console.error('Error fetching success story:', error);
    return NextResponse.json(
      { error: 'Failed to fetch success story' },
      { status: 500 }
    );
  }
}
