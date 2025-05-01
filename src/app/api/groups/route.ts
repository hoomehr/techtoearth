import { NextResponse } from 'next/server';
import { getGroups } from '@/app/api/data';

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
