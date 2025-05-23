import { NextResponse } from 'next/server';
import { getGroup } from '@/app/api/data';
import dbConnect from '@/lib/mongodb';
import Group from '@/models/Group';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // In Next.js 15, we need to await params before accessing its properties
  const paramsData = await params;
  const id = paramsData.id;

  try {
    const groupId = parseInt(id);
    const group = await getGroup(groupId);

    if (!group) {
      return NextResponse.json(
        { error: 'Group not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(group);
  } catch (error) {
    console.error('Error fetching group:', error);
    return NextResponse.json(
      { error: 'Failed to fetch group' },
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
    const groupId = parseInt(id);
    const data = await request.json();

    // Find the group by ID
    const group = await Group.findOne({ id: groupId });

    if (!group) {
      return NextResponse.json(
        { error: 'Group not found' },
        { status: 404 }
      );
    }

    // Update group fields
    Object.keys(data).forEach(key => {
      group[key] = data[key];
    });

    // Preserve the creatorId
    if (group.creatorId) {
      group.creatorId = group.creatorId;
    }

    // Update the updatedAt timestamp
    group.updatedAt = new Date();

    // Save the updated group
    await group.save();

    return NextResponse.json({
      success: true,
      message: 'Group updated successfully',
      group
    });
  } catch (error) {
    console.error('Error updating group:', error);
    return NextResponse.json(
      { error: 'Failed to update group' },
      { status: 500 }
    );
  }
}
