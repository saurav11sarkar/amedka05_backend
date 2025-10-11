import express from 'express';
import auth from '../../middlewares/auth';
import { dashboardController } from './dashboard.controller';
const router = express.Router();

router.get('/overview', auth('admin'), dashboardController.dashbordOverview);

router.get(
  '/active-creator-agent',
  auth('admin'),
  dashboardController.activeCreatorsAgent,
);

router.get('/trips', auth('admin'), dashboardController.trips);

router.get('/contact-report', auth('admin'), dashboardController.contactReport);

export const dashboardRouter = router;
