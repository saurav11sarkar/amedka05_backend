import express from 'express';
import { partnershipController } from './partnership.controller';
import { fileUploader } from '../../helper/fileUploder';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create',
  auth('admin'),
  fileUploader.upload.single('image'),
  partnershipController.createPartnership,
);
router.get('/', partnershipController.getAllParnerships);
router.get('/:id', partnershipController.getSinglePartnership);
router.put(
  '/:id',
  auth('admin'),
  fileUploader.upload.single('image'),
  partnershipController.updatePartnership,
);
router.delete('/:id', auth('admin'), partnershipController.deletePartnership);

export const partnershipRouter = router;
