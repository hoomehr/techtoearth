// This file provides data access functions that work both on the client and server
// It can use either the local JSON files or the MongoDB API

import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Course from '@/models/Course';
import Event from '@/models/Event';
import Group from '@/models/Group';

// Flag to determine whether to use MongoDB or local JSON files
const USE_MONGODB = process.env.USE_MONGODB === 'true';
console.log('USE_MONGODB flag:', USE_MONGODB, 'Value:', process.env.USE_MONGODB);

// Import local JSON files as fallback
import coursesData from '@/data/courses.json';
import eventsData from '@/data/events.json';
import groupsData from '@/data/groups.json';
import usersData from '@/data/users.json';

// Courses
export async function getCourses() {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      console.log('MongoDB connected, fetching courses...');
      const courses = await Course.find({}).sort({ id: 1 }).lean();
      console.log('Courses from MongoDB:', courses);
      return { courses };
    } catch (error) {
      console.error('Error fetching courses from MongoDB:', error);
      // Fallback to local JSON
      return { courses: coursesData.courses };
    }
  } else {
    return { courses: coursesData.courses };
  }
}

export async function getCourse(id: number) {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      const course = await Course.findOne({ id }).lean();
      return course;
    } catch (error) {
      console.error('Error fetching course from MongoDB:', error);
      // Fallback to local JSON
      return coursesData.courses.find(c => c.id === id);
    }
  } else {
    return coursesData.courses.find(c => c.id === id);
  }
}

// Events
export async function getEvents() {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      const events = await Event.find({}).sort({ id: 1 }).lean();
      return { events };
    } catch (error) {
      console.error('Error fetching events from MongoDB:', error);
      // Fallback to local JSON
      return { events: eventsData.events };
    }
  } else {
    return { events: eventsData.events };
  }
}

export async function getEvent(id: number) {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      const event = await Event.findOne({ id }).lean();
      return event;
    } catch (error) {
      console.error('Error fetching event from MongoDB:', error);
      // Fallback to local JSON
      return eventsData.events.find(e => e.id === id);
    }
  } else {
    return eventsData.events.find(e => e.id === id);
  }
}

// Groups
export async function getGroups() {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      const groups = await Group.find({}).sort({ id: 1 }).lean();
      return { groups };
    } catch (error) {
      console.error('Error fetching groups from MongoDB:', error);
      // Fallback to local JSON
      return { groups: groupsData.groups };
    }
  } else {
    return { groups: groupsData.groups };
  }
}

export async function getGroup(id: number) {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      const group = await Group.findOne({ id }).lean();
      return group;
    } catch (error) {
      console.error('Error fetching group from MongoDB:', error);
      // Fallback to local JSON
      return groupsData.groups.find(g => g.id === id);
    }
  } else {
    return groupsData.groups.find(g => g.id === id);
  }
}

// Users
export async function getUsers() {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      const users = await User.find({}).sort({ id: 1 }).lean();
      return { users };
    } catch (error) {
      console.error('Error fetching users from MongoDB:', error);
      // Fallback to local JSON
      return { users: usersData.users };
    }
  } else {
    return { users: usersData.users };
  }
}

export async function getUser(id: number) {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      const user = await User.findOne({ id }).lean();
      return user;
    } catch (error) {
      console.error('Error fetching user from MongoDB:', error);
      // Fallback to local JSON
      return usersData.users.find(u => u.id === id);
    }
  } else {
    return usersData.users.find(u => u.id === id);
  }
}

// Current user (for profile)
export async function getCurrentUser() {
  if (USE_MONGODB) {
    try {
      await dbConnect();
      // For now, we'll just return the first user
      const user = await User.findOne({ id: 1 }).lean();
      return user;
    } catch (error) {
      console.error('Error fetching current user from MongoDB:', error);
      // Fallback to local JSON
      return usersData.users[0];
    }
  } else {
    // For now, we'll just return the first user
    return usersData.users[0];
  }
}
