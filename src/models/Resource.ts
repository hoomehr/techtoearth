import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    author: { type: String },
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);
