import express from 'express';
import { eventController } from './event.controller';
import { fileUploader } from '../../helper/fileUploder';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create',
  auth('admin'),
  fileUploader.upload.single('video'),
  eventController.createEvent,
);

router.get('/', eventController.getAllevents);
router.get('/:id', eventController.getSingleEvent);
router.put(
  '/:id',
  auth('admin'),
  fileUploader.upload.single('video'),
  eventController.updateEvent,
);
router.delete('/:id',auth('admin'), eventController.deleteEvent);

export const eventRouter = router;
