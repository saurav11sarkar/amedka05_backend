import mongoose from 'mongoose';
import { IEvent } from './event.interface';

const eventSchema = new mongoose.Schema<IEvent>(
  {
    // url: String,
    video: String,
  },
  { timestamps: true },
);

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
