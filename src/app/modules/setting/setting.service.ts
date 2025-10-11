import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import bcrypt from 'bcryptjs';

const profileSetting = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  return user;
};

const updateProfileSetting = async (
  userId: string,
  payload: Partial<IUser>,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  if (file) {
    const profileSetting = await fileUploader.uploadToCloudinary(file);
    payload.profileImage = profileSetting.secure_url;
  }
  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return result;
};

const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new AppError(400, 'Old password is incorrect');
  user.password = newPassword;
  await user.save();
  return user;
};

export const settingService = {
  profileSetting,
  updateProfileSetting,
  changePassword,
};
