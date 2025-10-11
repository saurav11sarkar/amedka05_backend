import express from 'express';
import { fileUploader } from '../../helper/fileUploder';
import { tripController } from './trips.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create',
  auth('admin'),
  fileUploader.upload.single('image'),
  tripController.createTrip,
);

router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getSingleTrip);
router.put(
  '/:id',
  auth('admin'),
  fileUploader.upload.single('image'),
  tripController.updateTrip,
);
router.delete('/:id', auth('admin'), tripController.deleteTrip);

export const tripsRouter = router;
