# TechToEarth

TechToEarth is a platform designed to help tech professionals transition to careers in agriculture, food, and beverage industries. The platform provides courses, community features, and resources to support this career transition.

## Features

- **Course Platform**: Learn from industry experts with practical, hands-on courses
- **Community Features**: Connect with like-minded professionals making similar transitions
- **Resource Center**: Access guides, tools, and resources for your career change
- **User Profiles**: Track your progress and customize your learning journey

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/techiefarms.git
   cd techiefarms
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your MongoDB connection string and other required variables.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## App Structure

TechToEarth follows a client-server architecture with the following components:

- **Frontend**: Next.js with React components
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose models
- **Authentication**: Not yet fully implemented
- **Styling**: Tailwind CSS for responsive design

### User Roles

The application has three types of users:

1. **Regular Users**: Can browse courses, events, groups, and resources. They can enroll in courses, save events, and join groups.

2. **Creators**: Can create and edit their own courses, events, and groups. They cannot edit content created by other users. Creators have a "Creator" badge displayed on their profile.

3. **Administrators**: Have full access to all features. They can create, edit, and delete any content in the system. Administrators have an "Admin" badge displayed on their profile.

### Key Components

1. **Courses**: Educational content for tech-to-agriculture transition
2. **Events**: Virtual and in-person gatherings for networking
3. **Groups**: Community spaces for specific agricultural interests
4. **Resources**: Books, guides, videos, and podcasts
5. **Success Stories**: Profiles of people who successfully transitioned

### Data Flow

1. Client-side components fetch data from API routes using useEffect and fetch API
2. API routes connect to MongoDB using Mongoose models
3. Data is returned as JSON and rendered in React components
4. Loading states are implemented during data fetching
5. Error handling is implemented for failed API requests

## Directory Structure

```
techiefarms/
├── public/                  # Static assets
├── scripts/                 # Utility scripts
│   └── seed-db.js           # Database seeding script
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── about/           # About page
│   │   ├── api/             # API routes
│   │   │   ├── courses/     # Courses API endpoints
│   │   │   ├── events/      # Events API endpoints
│   │   │   ├── groups/      # Groups API endpoints
│   │   │   ├── resources/   # Resources API endpoints
│   │   │   ├── success-stories/ # Success stories API endpoints
│   │   │   ├── users/       # Users API endpoints
│   │   │   └── data.ts      # Data access layer
│   │   ├── community/       # Community page
│   │   ├── courses/         # Courses pages
│   │   ├── events/          # Events pages
│   │   ├── groups/          # Groups pages
│   │   ├── profile/         # User profile page
│   │   ├── resources/       # Resources page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable React components
│   │   ├── cards/           # Card components
│   │   ├── filters/         # Filter components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # UI components
│   ├── data/                # Mock data (being replaced by MongoDB)
│   ├── lib/                 # Utility functions
│   │   └── mongodb.ts       # MongoDB connection utility
│   ├── models/              # Mongoose models
│   └── X_data/              # Original mock data for reference
└── tailwind.config.js       # Tailwind CSS configuration
```

## MongoDB Models

### Course Model

```typescript
interface ICourse extends Document {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  price: number;
  image: string;
  category: string;
  topics: string[];
  modules?: {
    title: string;
    lessons: string[];
  }[];
  lessons?: {
    title: string;
    duration: string;
    content: string;
  }[];
  creatorId?: number; // ID of the user who created the course
  createdAt: Date;
  updatedAt: Date;
}
```

### Event Model

```typescript
interface IEvent extends Document {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  image: string;
  category: string;
  organizer: string;
  maxAttendees?: number;
  creatorId?: number; // ID of the user who created the event
  createdAt: Date;
  updatedAt: Date;
}
```

### Group Model

```typescript
interface IGroup extends Document {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  image: string;
  meetingFrequency?: string;
  isPrivate: boolean;
  topics: string[];
  creatorId?: number; // ID of the user who created the group
  createdAt: Date;
  updatedAt: Date;
}
```

### Resource Model

```typescript
interface IResource extends Document {
  id: number;
  title: string;
  description: string;
  type: string;
  author: string;
  url: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### SuccessStory Model

```typescript
interface ISuccessStory extends Document {
  id: number;
  name: string;
  formerRole: string;
  currentRole: string;
  testimonial: string;
  transitionYear: string;
  imageSrc: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Model

```typescript
interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  isAdmin?: boolean;
  isCreator?: boolean;
  joinedDate: string;
  enrolledCourses: number[];
  savedEvents: number[];
  joinedGroups: number[];
  savedResources: number[];
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Routes

- `/api/courses` - Get all courses
- `/api/courses/:id` - Get a specific course
- `/api/events` - Get all events
- `/api/events/:id` - Get a specific event
- `/api/groups` - Get all groups
- `/api/groups/:id` - Get a specific group
- `/api/resources` - Get all resources
- `/api/resources/:id` - Get a specific resource
- `/api/success-stories` - Get all success stories
- `/api/success-stories/:id` - Get a specific success story
- `/api/users/:id` - Get a specific user

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
