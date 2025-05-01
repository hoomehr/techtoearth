import { NextResponse } from 'next/server';
import { getUser } from '@/app/api/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    const user = await getUser(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
