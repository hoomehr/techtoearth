import { NextResponse } from 'next/server';
import { getEvent } from '@/app/api/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = parseInt(params.id);
    const event = await getEvent(eventId);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}
