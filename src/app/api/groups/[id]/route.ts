import { NextResponse } from 'next/server';
import { getGroup } from '@/app/api/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const groupId = parseInt(params.id);
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
