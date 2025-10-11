import express from 'express';
import { agentController } from './agent.controller';
import { fileUploader } from '../../helper/fileUploder';
import auth from '../../middlewares/auth';

const router = express.Router();

// only admin access this route
router.put('/status/:id', auth('admin'), agentController.updatedStatus);

router.post(
  '/request',
  fileUploader.upload.single('image'),
  agentController.requestAgent,
);

router.get('/', agentController.getAllAgent);

router.get('/:id', agentController.getSingleAgent);

router.put(
  '/:id',
  auth('admin'),
  fileUploader.upload.single('image'),
  agentController.updatedAgent,
);

router.delete('/:id',auth('admin'),  agentController.deleteAgent);

export const agentRouter = router;
