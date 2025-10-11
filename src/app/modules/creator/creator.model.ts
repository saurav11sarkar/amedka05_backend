import mongoose from 'mongoose';
import { ICreator } from './creator.interface';

const creatorSchema = new mongoose.Schema<ICreator>(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    description: { type: String },
    socialMedia: [
      {
        platform: { type: String },
        link: { type: String },
        followers: { type: Number },
      }
    ],
    interests: [{ type: String }],
    status: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      default: 'pending',
    },
    image: [{ type: String }],
  },
  { timestamps: true },
);

const Creator = mongoose.model<ICreator>('Creator', creatorSchema);
export default Creator;
