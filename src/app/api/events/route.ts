import { NextResponse } from 'next/server';
import { getEvents } from '@/app/api/data';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    const { events } = await getEvents();
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Generate a new ID (in a real app, you'd use a more robust method)
    // First try to get the last event from the database
    let lastEvent = await Event.findOne().sort({ id: -1 });

    // If no events in the database, get from the sample data
    if (!lastEvent) {
      const { events } = await getEvents();
      const lastSampleEvent = events.sort((a, b) => b.id - a.id)[0];
      const newId = lastSampleEvent ? lastSampleEvent.id + 1 : 1;

      // Create the new event
      const event = await Event.create({
        ...data,
        id: newId,
        creatorId: data.creatorId, // Ensure creatorId is set
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return NextResponse.json({
        success: true,
        message: 'Event created successfully',
        event
      });
    } else {
      // Create the new event with the next ID
      const newId = lastEvent.id + 1;
      const event = await Event.create({
        ...data,
        id: newId,
        creatorId: data.creatorId, // Ensure creatorId is set
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return NextResponse.json({
        success: true,
        message: 'Event created successfully',
        event
      });
    }
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create event' },
      { status: 500 }
    );
  }
}
