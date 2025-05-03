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
    category: { type: String, required: true }
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
