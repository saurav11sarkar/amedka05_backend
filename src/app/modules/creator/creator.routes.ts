import express from 'express';
import { creatorController } from './creator.controller';
import { fileUploader } from '../../helper/fileUploder';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/request',
  fileUploader.upload.array('image'),
  creatorController.requestCreator,
);

// only admin access this route
router.put('/status/:id', auth('admin'), creatorController.updatedStatus);

router.get('/', creatorController.getAllCreators);
router.get('/:id', creatorController.singleCreator);
router.put(
  '/:id',
  auth('admin'),
  fileUploader.upload.array('image'),
  creatorController.updatedCreator,
);
router.delete('/:id', auth('admin'), creatorController.deleteCreator);

export const creatorRouter = router;
