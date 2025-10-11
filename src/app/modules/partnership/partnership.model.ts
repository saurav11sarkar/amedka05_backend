import mongoose from 'mongoose';
import { IPartnership } from './partnership.interface';

const partnershipSchema = new mongoose.Schema<IPartnership>(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

const Partnership = mongoose.model<IPartnership>(
  'Partnership',
  partnershipSchema,
);
export default Partnership;
