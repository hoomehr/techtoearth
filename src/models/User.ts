import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  isAdmin?: boolean;
  isCreator?: boolean;
  joinedDate: string;
  enrolledCourses?: number[];
  savedEvents?: number[];
  enrolledEvents?: number[]; // For registered events
  joinedGroups?: number[];
  savedResources?: number[];
  password?: string; // Optional for authentication
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    bio: { type: String, default: 'No bio provided' },
    location: { type: String, default: 'Not specified' },
    isAdmin: { type: Boolean, default: false },
    isCreator: { type: Boolean, default: false },
    joinedDate: { type: String, required: true },
    enrolledCourses: [{ type: Number }],
    savedEvents: [{ type: Number }],
    enrolledEvents: [{ type: Number }], // For registered events
    joinedGroups: [{ type: Number }],
    savedResources: [{ type: Number }],
    password: { type: String }, // Optional for authentication
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
