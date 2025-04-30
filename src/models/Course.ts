import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  instructor: string;
  price: number;
  topics: string[];
  content: {
    modules: {
      title: string;
      lessons: {
        title: string;
        videoUrl?: string;
        content?: string;
        duration?: string;
      }[];
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    instructor: { type: String, required: true },
    price: { type: Number, required: true },
    topics: [{ type: String }],
    content: {
      modules: [
        {
          title: { type: String, required: true },
          lessons: [
            {
              title: { type: String, required: true },
              videoUrl: { type: String },
              content: { type: String },
              duration: { type: String },
            },
          ],
        },
      ],
    },
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
