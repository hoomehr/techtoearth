import { NextResponse } from 'next/server';
import { getCourse } from '@/app/api/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id);
    const course = await getCourse(courseId);

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}
