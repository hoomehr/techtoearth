import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Resource from '@/models/Resource';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const resourceId = parseInt(params.id);
    const resource = await Resource.findOne({ id: resourceId }).lean();
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource' },
      { status: 500 }
    );
  }
}
