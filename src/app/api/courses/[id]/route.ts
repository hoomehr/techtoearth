import { NextResponse } from 'next/server';
import { getCourse } from '@/app/api/data';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // In Next.js 15, we need to await params before accessing its properties
  const paramsData = await params;
  const id = paramsData.id;

  try {
    const courseId = parseInt(id);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // In Next.js 15, we need to await params before accessing its properties
  const paramsData = await params;
  const id = paramsData.id;

  try {
    await dbConnect();
    const courseId = parseInt(id);
    const data = await request.json();

    // Find the course by ID
    const course = await Course.findOne({ id: courseId });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Update course fields
    Object.keys(data).forEach(key => {
      course[key] = data[key];
    });

    // Update the updatedAt timestamp
    course.updatedAt = new Date();

    // Save the updated course
    await course.save();

    return NextResponse.json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}
