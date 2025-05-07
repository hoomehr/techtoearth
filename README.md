# TechToEarth

TechToEarth is a platform designed to help tech professionals transition to careers in agriculture, food, and beverage industries. The platform provides courses, community features, and resources to support this career transition.

## Features

- **Course Platform**: Learn from industry experts with practical, hands-on courses
- **Community Features**: Connect with like-minded professionals making similar transitions
- **Resource Center**: Access guides, tools, and resources for your career change
- **User Profiles**: Track your progress and customize your learning journey
- **Events**: Join virtual and in-person events to network with professionals
- **Groups**: Participate in specialized interest groups within the agriculture sector

## Tech Stack

- **Frontend**: Next.js 14+, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Custom authentication system (JWT-based)
- **Styling**: Tailwind CSS with custom gradient backgrounds
- **Deployment**: Vercel (recommended)

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

### Registration Process

When a user registers for courses, events, or groups, the following happens:

1. **Course Enrollment**:
   - The user ID is added to the course's `enrolledStudents` array
   - The course ID is added to the user's `enrolledCourses` array
   - The course's `enrollmentCount` is incremented

2. **Event Registration**:
   - The user ID is added to the event's `attendees` array
   - The event ID is added to both the user's `savedEvents` and `enrolledEvents` arrays
   - The event's `attendeeCount` is incremented

3. **Group Joining**:
   - The user ID is added to the group's `members` array
   - The group ID is added to the user's `joinedGroups` array
   - The group's `memberCount` is incremented

This dual-update approach ensures that:
- The user's profile dashboard can display all enrolled courses, registered events, and joined groups
- The content pages can show accurate enrollment/registration/membership counts
- The content pages can check if the current user is already enrolled/registered/a member

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
  enrolledStudents?: number[];  // Array of user IDs who are enrolled
  enrollmentCount?: number;     // Count of enrolled students
  creatorId?: number;           // ID of the user who created the course
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
  attendees?: number[];      // Array of user IDs who are registered
  attendeeCount?: number;    // Count of registered attendees
  creatorId?: number;        // ID of the user who created the event
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
  members?: number[];        // Array of user IDs who are members
  creatorId?: number;        // ID of the user who created the group
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
  enrolledCourses?: number[];  // Courses the user has enrolled in
  savedEvents?: number[];      // Events the user has saved
  enrolledEvents?: number[];   // Events the user has registered for
  joinedGroups?: number[];     // Groups the user has joined
  savedResources?: number[];   // Resources the user has saved
  password?: string;           // Hashed password for authentication
  createdAt: Date;
  updatedAt: Date;
}
```

## API Routes

### Data Retrieval
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

### User Actions
- `/api/courses/enroll` - Enroll in a course (POST) or unenroll (DELETE)
- `/api/events/register` - Register for an event (POST) or unregister (DELETE)
- `/api/groups/join` - Join a group (POST) or leave (DELETE)
- `/api/users/update` - Update user profile information (PUT)

### Admin/Creator Actions
- `/api/courses/create` - Create a new course (POST)
- `/api/courses/update/:id` - Update an existing course (PUT)
- `/api/events/create` - Create a new event (POST)
- `/api/events/update/:id` - Update an existing event (PUT)
- `/api/groups/create` - Create a new group (POST)
- `/api/groups/update/:id` - Update an existing group (PUT)

## Profile Dashboard

The profile dashboard is a central feature of the TechToEarth platform, allowing users to:

1. **View Personal Information**:
   - Profile picture, name, email, bio, and location
   - Admin/Creator badges if applicable
   - Edit profile information via a modal form

2. **Track Learning Progress**:
   - View all enrolled courses with progress indicators
   - Access registered events with date, time, and location details
   - See joined groups with member counts and categories

3. **Content Management** (for Admins and Creators):
   - Add new courses, events, and groups
   - Edit existing content (Admins can edit all content, Creators can only edit their own)

The dashboard uses a tab-based interface to organize different types of content, making it easy for users to navigate between their courses, events, and groups.

## Styling and UI Components

TechToEarth uses a consistent design system throughout the application:

### Color Scheme
- Primary gradient: Green to yellow (#b3dfa1 to #f0e703)
- Button colors: Light green (#00f260)
- Card backgrounds: Gradient from #00f260 to #0575e6
- Text: Dark gray for headings, medium gray for body text

### Typography
- Font family: ABC Whyte, Verdana, sans-serif
- Headings: Bold, tracking-tight
- Body text: Regular weight

### UI Components
- **Cards**: Used for courses, events, groups, and resources with consistent styling
- **Buttons**: Rounded with light green background
- **Tabs**: Used in the profile dashboard for navigation
- **Modals**: Used for forms with blurred backgrounds
- **Badges**: Used to indicate user roles (Admin, Creator) and content categories

### Layout Patterns
- **Header**: Consistent across all pages with navigation
- **Page Headers**: Tag + Title + Subtitle pattern
- **Content Grids**: 3-column for courses and resources, 2-column for events and groups
- **Forms**: Consistent styling with validation

## Known Issues and Future Improvements

1. **Authentication**:
   - Implement proper JWT-based authentication
   - Add social login options (Google, LinkedIn)
   - Secure admin and creator routes

2. **Content Management**:
   - Add image upload functionality for courses, events, and groups
   - Implement rich text editing for descriptions
   - Add validation for form inputs

3. **User Experience**:
   - Implement real-time notifications for new content
   - Add search functionality across all content types
   - Improve mobile responsiveness

4. **Performance**:
   - Implement server-side rendering for better SEO
   - Add pagination for large data sets
   - Optimize image loading with next/image

5. **Data Consistency**:
   - Implement database transactions for enrollment/registration/joining operations
   - Add data validation middleware for API routes
   - Create database indexes for frequently queried fields

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
