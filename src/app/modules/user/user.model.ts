import mongoose from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    profileImage: { type: String },
    otp: { type: String },
    otpExpiry: { type: Date },
    verified: { type: Boolean, default: false },
    jobTitle: { type: String },
    bio: { type: String },
    location: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcryptSaltRounds),
    );
  }
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
