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

## Project Structure

- `/src/app`: Next.js App Router pages and layouts
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions and libraries
- `/src/models`: MongoDB/Mongoose models
- `/src/types`: TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
