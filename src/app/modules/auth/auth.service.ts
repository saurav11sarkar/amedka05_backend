import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/appError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { jwtHelpers } from '../../helper/jwtHelpers';
import sendMailer from '../../helper/sendMailer';

import bcrypt from 'bcryptjs';
import createOtpTemplate from '../../utils/createOtpTemplate';

const registerUser = async (payload: Partial<IUser>) => {
  const exist = await User.findOne({ email: payload.email });
  if (exist) throw new AppError(400, 'User already exists');

  const idx = Math.floor(Math.random() * 100) + 1;
  payload.profileImage = `https://avatar.iran.liara.run/public/${idx}.png`;

  const user = await User.create({
    ...payload,
    verified: true,
  });

  return user;
};

const loginUser = async (payload: Partial<IUser>) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new AppError(401, 'User not found');
  if (!payload.password) throw new AppError(400, 'Password is required');

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) throw new AppError(401, 'Password not matched');
  if (!user.verified) throw new AppError(403, 'Please verify your email first');

  const accessToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.accessTokenSecret as Secret,
    config.jwt.accessTokenExpires,
  );

  const refreshToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.refreshTokenSecret as Secret,
    config.jwt.refreshTokenExpires,
  );

  const { password, ...userWithoutPassword } = user.toObject();
  return { accessToken, refreshToken, user: userWithoutPassword };
};

const refreshToken = async (token: string) => {
  const varifiedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.refreshTokenSecret as Secret,
  ) as JwtPayload;

  const user = await User.findById(varifiedToken.id).select('-password');
  if (!user) throw new AppError(401, 'User not found');

  const accessToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.accessTokenSecret as Secret,
    config.jwt.accessTokenExpires,
  );

  return { accessToken};
};

// FORGOT PASSWORD (send OTP)
const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(401, 'User not found');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
  await user.save();

  await sendMailer(
    user.email,
    user.firstName,
    createOtpTemplate(otp, user.email, 'Your Company'),
  );

  return { message: 'OTP sent to your email' };
};

// VERIFY EMAIL
const verifiedEmail = async (email: string, otp: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(401, 'User not found');

  if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
    throw new AppError(400, 'Invalid or expired OTP');
  }

  user.verified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  return { message: 'Email verified successfully' };
};

// RESET PASSWORD DIRECTLY (after forgot-password)
const resetPasswordChange = async (email: string, newPassword: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(404, 'User not found');

  user.password = newPassword; // bcrypt will hash via pre-save
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const accessToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.accessTokenSecret as Secret,
    config.jwt.accessTokenExpires,
  );
  const refreshToken = jwtHelpers.genaretToken(
    { id: user._id, role: user.role, email: user.email },
    config.jwt.refreshTokenSecret as Secret,
    config.jwt.refreshTokenExpires,
  );

  const { password, ...userWithoutPassword } = user.toObject();
  return {
    message: 'Password reset successfully',
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

// const resetPassword = async (
//   email: string,
//   otp: string,
//   newPassword: string,
// ) => {
//   const user = await User.findOne({ email }).select('-password');
//   if (!user) throw new AppError(404, 'User not found');

//   if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
//     throw new AppError(400, 'Invalid or expired OTP');
//   }

//   user.password = newPassword;
//   user.otp = undefined;
//   user.otpExpiry = undefined;
//   await user.save();

//   // Auto-login after reset
//   const accessToken = jwtHelpers.genaretToken(
//     { id: user._id, role: user.role, email: user.email },
//     config.jwt.accessTokenSecret as Secret,
//     config.jwt.accessTokenExpires,
//   );
//   const refreshToken = jwtHelpers.genaretToken(
//     { id: user._id, role: user.role, email: user.email },
//     config.jwt.refreshTokenSecret as Secret,
//     config.jwt.refreshTokenExpires,
//   );

//   // const { password, ...userWithoutPassword } = user.toObject();
//   return {
//     message: 'Password reset successfully',
//     accessToken,
//     refreshToken,
//     user: user,
//   };
// };

export const authService = {
  registerUser,
  loginUser,
  refreshToken,
  forgotPassword,
  verifiedEmail,
  resetPasswordChange
};
