import express from 'express';
import auth from '../../middlewares/auth';
import { settingController } from './setting.controller';
import { fileUploader } from '../../helper/fileUploder';
const router = express.Router();

router.get('/profile', auth('admin'), settingController.profileSetting);
router.put(
  '/profile',
  auth('admin'),
  fileUploader.upload.single('profileImage'),
  settingController.updateProfileSetting,
);
router.put('/change-password', auth('admin'), settingController.changePassword);

export const settingRouter = router;
