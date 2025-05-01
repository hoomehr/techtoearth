import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  instructor: string;
  price: number;
  topics: string[];
  modules: {
    title: string;
    lessons: string[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
