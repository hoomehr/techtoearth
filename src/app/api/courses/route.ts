import { NextResponse } from 'next/server';
import { getCourses } from '@/app/api/data';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET() {
  try {
    const { courses } = await getCourses();
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Generate a new ID (in a real app, you'd use a more robust method)
    // First try to get the last course from the database
    let lastCourse = await Course.findOne().sort({ id: -1 });

    // If no courses in the database, get from the sample data
    if (!lastCourse) {
      const { courses } = await getCourses();
      const lastSampleCourse = courses.sort((a, b) => b.id - a.id)[0];
      const newId = lastSampleCourse ? lastSampleCourse.id + 1 : 1;

      // Create the new course
      const course = await Course.create({
        ...data,
        id: newId,
        creatorId: data.creatorId, // Ensure creatorId is set
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return NextResponse.json({
        success: true,
        message: 'Course created successfully',
        course
      });
    } else {
      // Create the new course with the next ID
      const newId = lastCourse.id + 1;
      const course = await Course.create({
        ...data,
        id: newId,
        creatorId: data.creatorId, // Ensure creatorId is set
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return NextResponse.json({
        success: true,
        message: 'Course created successfully',
        course
      });
    }
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create course' },
      { status: 500 }
    );
  }
}
