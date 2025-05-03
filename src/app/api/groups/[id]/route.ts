import { NextResponse } from 'next/server';
import { getGroup } from '@/app/api/data';

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
