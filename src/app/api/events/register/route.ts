import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    console.log('Request body:', body);
    const { eventId, userId } = body;

    if (!eventId || !userId) {
      console.log('Missing eventId or userId:', { eventId, userId });
      return NextResponse.json(
        { error: 'Event ID and User ID are required' },
        { status: 400 }
      );
    }

    // Find the event
    console.log('Looking for event with id:', eventId);
    const event = await Event.findOne({ id: eventId });
    console.log('Event found:', event ? 'Yes' : 'No');
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Find the user
    console.log('Looking for user with id:', userId);
    const user = await User.findOne({ id: userId });
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if the event has reached maximum attendees
    if (event.maxAttendees && event.attendeeCount >= event.maxAttendees) {
      return NextResponse.json(
        { error: 'Event has reached maximum capacity' },
        { status: 400 }
      );
    }

    // Check if user is already registered
    if (event.attendees && event.attendees.includes(userId)) {
      return NextResponse.json(
        { error: 'User is already registered for this event' },
        { status: 400 }
      );
    }

    // Add user to event attendees
    if (!event.attendees) {
      event.attendees = [];
    }
    event.attendees.push(userId);
    event.attendeeCount = (event.attendeeCount || 0) + 1;
    await event.save();

    // Add event to user's saved events
    if (!user.savedEvents) {
      user.savedEvents = [];
    }
    if (!user.savedEvents.includes(eventId)) {
      user.savedEvents.push(eventId);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully registered for the event',
      event
    });
  } catch (error) {
    console.error('Error registering for event:', error);
    return NextResponse.json(
      { error: 'Failed to register for event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { eventId, userId } = await request.json();

    if (!eventId || !userId) {
      return NextResponse.json(
        { error: 'Event ID and User ID are required' },
        { status: 400 }
      );
    }

    // Find the event
    const event = await Event.findOne({ id: eventId });
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Find the user
    const user = await User.findOne({ id: userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is registered
    if (!event.attendees || !event.attendees.includes(userId)) {
      return NextResponse.json(
        { error: 'User is not registered for this event' },
        { status: 400 }
      );
    }

    // Remove user from event attendees
    event.attendees = event.attendees.filter(id => id !== userId);
    event.attendeeCount = (event.attendeeCount || 1) - 1;
    await event.save();

    // Remove event from user's saved events
    if (user.savedEvents) {
      user.savedEvents = user.savedEvents.filter(id => id !== eventId);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unregistered from the event',
      event
    });
  } catch (error) {
    console.error('Error unregistering from event:', error);
    return NextResponse.json(
      { error: 'Failed to unregister from event' },
      { status: 500 }
    );
  }
}
