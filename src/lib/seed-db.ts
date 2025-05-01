import dbConnect from './mongodb';
import User from '../models/User';
import Course from '../models/Course';
import Event from '../models/Event';
import Group from '../models/Group';

import usersData from '../data/users.json';
import coursesData from '../data/courses.json';
import eventsData from '../data/events.json';
import groupsData from '../data/groups.json';

async function seedDatabase() {
  try {
    // Connect to the database
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Event.deleteMany({});
    await Group.deleteMany({});
    console.log('Cleared existing data');

    // Seed users
    await User.insertMany(usersData.users);
    console.log(`Seeded ${usersData.users.length} users`);

    // Seed courses
    await Course.insertMany(coursesData.courses);
    console.log(`Seeded ${coursesData.courses.length} courses`);

    // Seed events
    await Event.insertMany(eventsData.events);
    console.log(`Seeded ${eventsData.events.length} events`);

    // Seed groups
    await Group.insertMany(groupsData.groups);
    console.log(`Seeded ${groupsData.groups.length} groups`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
