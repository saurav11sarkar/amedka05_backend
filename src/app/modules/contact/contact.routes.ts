import express from 'express';
import { contactController } from './contact.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/create', contactController.createContact);
router.get('/', auth('admin'), contactController.getAllContact);
router.get('/:id', auth('admin'), contactController.getSingleContact);
router.put('/:id', auth('admin'), contactController.updatedContact);
router.delete('/:id', auth('admin'), contactController.deleteContact);

export const contactRouter = router;
