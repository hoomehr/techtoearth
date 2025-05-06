import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  image: string;
  meetingFrequency?: string;
  isPrivate: boolean;
  topics: string[];
  creatorId?: number; // ID of the user who created the group
  members?: number[]; // IDs of users who joined the group
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    memberCount: { type: Number, default: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true },
    meetingFrequency: { type: String },
    isPrivate: { type: Boolean, default: false },
    topics: [{ type: String }],
    creatorId: { type: Number },
    members: [{ type: Number }], // IDs of users who joined the group
  },
  { timestamps: true }
);

// This is to prevent overwriting the model when the file is imported multiple times
export default mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);
