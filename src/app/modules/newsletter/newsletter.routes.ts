import express from 'express';
import { newsletterController } from './newsletter.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/', newsletterController.createNewsletter);
router.post('/broadcast', auth('admin'), newsletterController.broadcastNewsletter);

export const newsletterRouter = router;
