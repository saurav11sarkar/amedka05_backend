export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  profileImage?: string;
  otp?: string;
  otpExpiry?: Date;
  verified?: boolean;
  bio?: string;
  phoneNumber?: string;
  jobTitle?: string;
  location?: string;
}
