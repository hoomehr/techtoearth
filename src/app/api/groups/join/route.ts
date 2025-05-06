import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Group from '@/models/Group';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { groupId, userId } = await request.json();

    if (!groupId || !userId) {
      return NextResponse.json(
        { error: 'Group ID and User ID are required' },
        { status: 400 }
      );
    }

    // Find the group
    const group = await Group.findOne({ id: groupId });
    if (!group) {
      return NextResponse.json(
        { error: 'Group not found' },
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

    // Check if user is already a member
    if (group.members && group.members.includes(userId)) {
      return NextResponse.json(
        { error: 'User is already a member of this group' },
        { status: 400 }
      );
    }

    // Add user to group members
    if (!group.members) {
      group.members = [];
    }
    group.members.push(userId);
    group.memberCount = (group.memberCount || 0) + 1;
    await group.save();

    // Add group to user's joined groups
    if (!user.joinedGroups) {
      user.joinedGroups = [];
    }
    if (!user.joinedGroups.includes(groupId)) {
      user.joinedGroups.push(groupId);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the group',
      group
    });
  } catch (error) {
    console.error('Error joining group:', error);
    return NextResponse.json(
      { error: 'Failed to join group' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { groupId, userId } = await request.json();

    if (!groupId || !userId) {
      return NextResponse.json(
        { error: 'Group ID and User ID are required' },
        { status: 400 }
      );
    }

    // Find the group
    const group = await Group.findOne({ id: groupId });
    if (!group) {
      return NextResponse.json(
        { error: 'Group not found' },
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

    // Check if user is a member
    if (!group.members || !group.members.includes(userId)) {
      return NextResponse.json(
        { error: 'User is not a member of this group' },
        { status: 400 }
      );
    }

    // Remove user from group members
    group.members = group.members.filter(id => id !== userId);
    group.memberCount = (group.memberCount || 1) - 1;
    await group.save();

    // Remove group from user's joined groups
    if (user.joinedGroups) {
      user.joinedGroups = user.joinedGroups.filter(id => id !== groupId);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully left the group',
      group
    });
  } catch (error) {
    console.error('Error leaving group:', error);
    return NextResponse.json(
      { error: 'Failed to leave group' },
      { status: 500 }
    );
  }
}
