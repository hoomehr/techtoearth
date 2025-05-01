import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    isVirtual: { type: Boolean, default: false },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
