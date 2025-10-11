import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { settingService } from './setting.service';

const profileSetting = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await settingService.profileSetting(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile Setting',
    data: result,
  });
});

const updateProfileSetting = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const file = req.file as Express.Multer.File;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await settingService.updateProfileSetting(
    userId,
    fromData,
    file,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile Setting Updated',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { oldPassword, newPassword } = req.body;
  const result = await settingService.changePassword(
    userId,
    oldPassword,
    newPassword,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password Changed successfully',
    data: result,
  });
});

export const settingController = {
  profileSetting,
  updateProfileSetting,
  changePassword,
};
