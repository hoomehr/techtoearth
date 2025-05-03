import { NextResponse } from 'next/server';
import { getGroups } from '@/app/api/data';
import dbConnect from '@/lib/mongodb';
import Group from '@/models/Group';

export async function GET() {
  try {
    const { groups } = await getGroups();
    return NextResponse.json({ groups });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch groups' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Generate a new ID (in a real app, you'd use a more robust method)
    // First try to get the last group from the database
    let lastGroup = await Group.findOne().sort({ id: -1 });

    // If no groups in the database, get from the sample data
    if (!lastGroup) {
      const { groups } = await getGroups();
      const lastSampleGroup = groups.sort((a, b) => b.id - a.id)[0];
      const newId = lastSampleGroup ? lastSampleGroup.id + 1 : 1;

      // Create the new group
      const group = await Group.create({
        ...data,
        id: newId,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return NextResponse.json({
        success: true,
        message: 'Group created successfully',
        group
      });
    } else {
      // Create the new group with the next ID
      const newId = lastGroup.id + 1;
      const group = await Group.create({
        ...data,
        id: newId,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return NextResponse.json({
        success: true,
        message: 'Group created successfully',
        group
      });
    }
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create group' },
      { status: 500 }
    );
  }
}
