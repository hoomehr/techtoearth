import { NextResponse } from 'next/server';
import { getEvent } from '@/app/api/data';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // In Next.js 15, we need to await params before accessing its properties
  const paramsData = await params;
  const id = paramsData.id;

  try {
    const eventId = parseInt(id);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // In Next.js 15, we need to await params before accessing its properties
  const paramsData = await params;
  const id = paramsData.id;

  try {
    await dbConnect();
    const eventId = parseInt(id);
    const data = await request.json();

    // Find the event by ID
    const event = await Event.findOne({ id: eventId });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Update event fields
    Object.keys(data).forEach(key => {
      event[key] = data[key];
    });

    // Preserve the creatorId
    if (event.creatorId) {
      event.creatorId = event.creatorId;
    }

    // Update the updatedAt timestamp
    event.updatedAt = new Date();

    // Save the updated event
    await event.save();

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}
