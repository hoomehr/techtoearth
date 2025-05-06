import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { courseId, userId } = await request.json();

    if (!courseId || !userId) {
      return NextResponse.json(
        { error: 'Course ID and User ID are required' },
        { status: 400 }
      );
    }

    // Find the course
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
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

    // Check if user is already enrolled
    if (course.enrolledStudents && course.enrolledStudents.includes(userId)) {
      return NextResponse.json(
        { error: 'User is already enrolled in this course' },
        { status: 400 }
      );
    }

    // Add user to course enrolled students
    if (!course.enrolledStudents) {
      course.enrolledStudents = [];
    }
    course.enrolledStudents.push(userId);
    course.enrollmentCount = (course.enrollmentCount || 0) + 1;
    await course.save();

    // Add course to user's enrolled courses
    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully enrolled in the course',
      course
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { courseId, userId } = await request.json();

    if (!courseId || !userId) {
      return NextResponse.json(
        { error: 'Course ID and User ID are required' },
        { status: 400 }
      );
    }

    // Find the course
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
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

    // Check if user is enrolled
    if (!course.enrolledStudents || !course.enrolledStudents.includes(userId)) {
      return NextResponse.json(
        { error: 'User is not enrolled in this course' },
        { status: 400 }
      );
    }

    // Remove user from course enrolled students
    course.enrolledStudents = course.enrolledStudents.filter(id => id !== userId);
    course.enrollmentCount = (course.enrollmentCount || 1) - 1;
    await course.save();

    // Remove course from user's enrolled courses
    if (user.enrolledCourses) {
      user.enrolledCourses = user.enrolledCourses.filter(id => id !== courseId);
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unenrolled from the course',
      course
    });
  } catch (error) {
    console.error('Error unenrolling from course:', error);
    return NextResponse.json(
      { error: 'Failed to unenroll from course' },
      { status: 500 }
    );
  }
}
