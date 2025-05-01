import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
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

const ResourceSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);
