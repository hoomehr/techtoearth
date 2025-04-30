import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  techBackground?: string;
  interests?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    techBackground: { type: String },
    interests: [{ type: String }],
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
