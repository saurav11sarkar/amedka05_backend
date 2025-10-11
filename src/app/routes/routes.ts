import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { agentRouter } from '../modules/agent/agent.routes';
import { creatorRouter } from '../modules/creator/creator.routes';
import { tripsRouter } from '../modules/trips/trips.routes';
import { partnershipRouter } from '../modules/partnership/partnership.routes';
import { eventRouter } from '../modules/event/event.routes';
import { contactRouter } from '../modules/contact/contact.routes';
import { settingRouter } from '../modules/setting/setting.routes';
import { dashboardRouter } from '../modules/dashboard/deshboard.routes';
import { newsletterRouter } from '../modules/newsletter/newsletter.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/agent',
    route: agentRouter,
  },
  {
    path: '/creator',
    route: creatorRouter,
  },
  {
    path: '/trip',
    route: tripsRouter,
  },
  {
    path: '/partnership',
    route: partnershipRouter,
  },
  {
    path: '/event',
    route: eventRouter,
  },
  {
    path: '/contact',
    route: contactRouter,
  },
  {
    path: '/setting',
    route: settingRouter,
  },
  {
    path: '/dashboard',
    route: dashboardRouter,
  },
  {
    path: '/newsletter',
    route: newsletterRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
