import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  instructor?: string;
  price?: number;
  topics?: string[];
  modules?: {
    title: string;
    lessons: string[];
  }[];
  lessons?: {
    title: string;
    duration: string;
    content: string;
  }[];
  category: string;
  creatorId?: number; // ID of the user who created the course
  enrolledStudents?: number[]; // IDs of users enrolled in the course
  enrollmentCount?: number; // Number of enrolled students
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema: Schema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  content: { type: String, required: true }
});

const CourseSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    instructor: { type: String },
    price: { type: Number },
    topics: [{ type: String }],
    modules: [
      {
        title: { type: String, required: true },
        lessons: [{ type: String }]
      }
    ],
    lessons: [LessonSchema],
    category: { type: String, required: true },
    creatorId: { type: Number },
    enrolledStudents: [{ type: Number }], // IDs of users enrolled in the course
    enrollmentCount: { type: Number, default: 0 } // Number of enrolled students
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
