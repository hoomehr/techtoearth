// This file provides data access functions for MongoDB

import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Course from '@/models/Course';
import Event from '@/models/Event';
import Group from '@/models/Group';
import SuccessStory from '@/models/SuccessStory';
import Resource from '@/models/Resource';

// Courses
export async function getCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({}).sort({ id: 1 }).lean();
    return { courses };
  } catch (error) {
    console.error('Error fetching courses from MongoDB:', error);
    throw error;
  }
}

export async function getCourse(id: number) {
  try {
    await dbConnect();
    const course = await Course.findOne({ id }).lean();
    return course;
  } catch (error) {
    console.error('Error fetching course from MongoDB:', error);
    throw error;
  }
}

// Events
export async function getEvents() {
  try {
    await dbConnect();
    const events = await Event.find({}).sort({ id: 1 }).lean();
    return { events };
  } catch (error) {
    console.error('Error fetching events from MongoDB:', error);
    throw error;
  }
}

export async function getEvent(id: number) {
  try {
    await dbConnect();
    const event = await Event.findOne({ id }).lean();
    return event;
  } catch (error) {
    console.error('Error fetching event from MongoDB:', error);
    throw error;
  }
}

// Groups
export async function getGroups() {
  try {
    await dbConnect();
    const groups = await Group.find({}).sort({ id: 1 }).lean();
    return { groups };
  } catch (error) {
    console.error('Error fetching groups from MongoDB:', error);
    throw error;
  }
}

export async function getGroup(id: number) {
  try {
    await dbConnect();
    const group = await Group.findOne({ id }).lean();
    return group;
  } catch (error) {
    console.error('Error fetching group from MongoDB:', error);
    throw error;
  }
}

// Users
export async function getUsers() {
  try {
    await dbConnect();
    const users = await User.find({}).sort({ id: 1 }).lean();
    return { users };
  } catch (error) {
    console.error('Error fetching users from MongoDB:', error);
    throw error;
  }
}

export async function getUser(id: number) {
  try {
    await dbConnect();
    const user = await User.findOne({ id }).lean();
    return user;
  } catch (error) {
    console.error('Error fetching user from MongoDB:', error);
    throw error;
  }
}

// Current user (for profile)
export async function getCurrentUser() {
  try {
    await dbConnect();
    // For now, we'll just return the first user
    const user = await User.findOne({ id: 1 }).lean();
    return user;
  } catch (error) {
    console.error('Error fetching current user from MongoDB:', error);
    throw error;
  }
}

// Success Stories
export async function getSuccessStories() {
  try {
    await dbConnect();
    const successStories = await SuccessStory.find({}).sort({ id: 1 }).lean();
    return { successStories };
  } catch (error) {
    console.error('Error fetching success stories from MongoDB:', error);
    throw error;
  }
}

export async function getSuccessStory(id: number) {
  try {
    await dbConnect();
    const successStory = await SuccessStory.findOne({ id }).lean();
    return successStory;
  } catch (error) {
    console.error('Error fetching success story from MongoDB:', error);
    throw error;
  }
}

// Resources
export async function getResources() {
  try {
    await dbConnect();
    const resources = await Resource.find({}).sort({ id: 1 }).lean();
    return { resources };
  } catch (error) {
    console.error('Error fetching resources from MongoDB:', error);
    throw error;
  }
}

export async function getResource(id: number) {
  try {
    await dbConnect();
    const resource = await Resource.findOne({ id }).lean();
    return resource;
  } catch (error) {
    console.error('Error fetching resource from MongoDB:', error);
    throw error;
  }
}
