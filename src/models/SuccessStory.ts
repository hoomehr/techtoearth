import mongoose, { Schema, Document } from 'mongoose';

export interface ISuccessStory extends Document {
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

const SuccessStorySchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    formerRole: { type: String, required: true },
    currentRole: { type: String, required: true },
    testimonial: { type: String, required: true },
    transitionYear: { type: String, required: true },
    imageSrc: { type: String, required: true },
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.SuccessStory || mongoose.model<ISuccessStory>('SuccessStory', SuccessStorySchema);
