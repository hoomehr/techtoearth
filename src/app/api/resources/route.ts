import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Resource from '@/models/Resource';

export async function GET() {
  try {
    await dbConnect();
    const resources = await Resource.find({}).sort({ id: 1 }).lean();
    return NextResponse.json({ resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}
