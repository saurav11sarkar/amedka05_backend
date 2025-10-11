import mongoose from 'mongoose';
import { ITrips } from './trips.interface';

const tripsSchema = new mongoose.Schema<ITrips>(
  {
    country: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    // participants: { type: [String], required: true },
    participants: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

const Trips = mongoose.model<ITrips>('Trips', tripsSchema);

export default Trips;
