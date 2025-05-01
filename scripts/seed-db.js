// This script is used to seed the database with mock data
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection - use the connection string from .env.local
const MONGODB_URI = process.env.MONGODB_URI;

// Load JSON data
const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/X_data/users.json'), 'utf8'));
const coursesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/X_data/courses.json'), 'utf8'));
const eventsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/X_data/events.json'), 'utf8'));
const groupsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/X_data/groups.json'), 'utf8'));
const successStoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/X_data/successStories.json'), 'utf8'));
const resourcesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/X_data/resources.json'), 'utf8'));

// Define schemas
const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  bio: { type: String, required: true },
  location: { type: String, required: true },
  joinedDate: { type: String, required: true },
  enrolledCourses: [{ type: Number }],
  savedEvents: [{ type: Number }],
  joinedGroups: [{ type: Number }],
  savedResources: [{ type: Number }],
  password: { type: String }, // Optional for authentication
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  instructor: { type: String, required: true },
  price: { type: Number, required: true },
  topics: [{ type: String }],
  modules: [
    {
      title: { type: String, required: true },
      lessons: [{ type: String }]
    }
  ]
}, { timestamps: true });

const EventSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  isVirtual: { type: Boolean, default: false },
  image: { type: String, required: true },
}, { timestamps: true });

const GroupSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  memberCount: { type: Number, default: 0 },
  category: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

// Define schemas for success stories and resources
const SuccessStorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  formerRole: { type: String, required: true },
  currentRole: { type: String, required: true },
  testimonial: { type: String, required: true },
  transitionYear: { type: Number, required: true },
  imageSrc: { type: String, required: true },
}, { timestamps: true });

const ResourceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

// Create models with original names
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Event = mongoose.model('Event', EventSchema);
const Group = mongoose.model('Group', GroupSchema);
const SuccessStory = mongoose.model('SuccessStory', SuccessStorySchema);
const Resource = mongoose.model('Resource', ResourceSchema);

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if collections already have data
    const userCount = await User.countDocuments();
    const courseCount = await Course.countDocuments();
    const eventCount = await Event.countDocuments();
    const groupCount = await Group.countDocuments();
    const successStoryCount = await SuccessStory.countDocuments();
    const resourceCount = await Resource.countDocuments();

    console.log('Current collection counts:');
    console.log(`User: ${userCount}`);
    console.log(`Course: ${courseCount}`);
    console.log(`Event: ${eventCount}`);
    console.log(`Group: ${groupCount}`);
    console.log(`SuccessStory: ${successStoryCount}`);
    console.log(`Resource: ${resourceCount}`);

    // Only seed if collections are empty
    if (userCount === 0) {
      // Seed users
      await User.insertMany(usersData.users);
      console.log(`Seeded ${usersData.users.length} users`);
    } else {
      console.log('Users collection already has data, skipping seed');
    }

    if (courseCount === 0) {
      // Seed courses
      await Course.insertMany(coursesData.courses);
      console.log(`Seeded ${coursesData.courses.length} courses`);
    } else {
      console.log('Courses collection already has data, skipping seed');
    }

    if (eventCount === 0) {
      // Seed events
      await Event.insertMany(eventsData.events);
      console.log(`Seeded ${eventsData.events.length} events`);
    } else {
      console.log('Events collection already has data, skipping seed');
    }

    if (groupCount === 0) {
      // Seed groups
      await Group.insertMany(groupsData.groups);
      console.log(`Seeded ${groupsData.groups.length} groups`);
    } else {
      console.log('Groups collection already has data, skipping seed');
    }

    if (successStoryCount === 0) {
      // Seed success stories
      await SuccessStory.insertMany(successStoriesData.successStories);
      console.log(`Seeded ${successStoriesData.successStories.length} success stories`);
    } else {
      console.log('SuccessStory collection already has data, skipping seed');
    }

    if (resourceCount === 0) {
      // Seed resources
      await Resource.insertMany(resourcesData.resources);
      console.log(`Seeded ${resourcesData.resources.length} resources`);
    } else {
      console.log('Resource collection already has data, skipping seed');
    }

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
