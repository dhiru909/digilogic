import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import {
  getWorkshopRegistrations,
  updateRegistrationStatus,
  downloadRegistrations
} from '../controllers/workshopController';

const router = Router();

// Admin routes - protected by auth and admin middleware

router.get('/workshops/:workshopId/registrations', adminAuth,getWorkshopRegistrations);
router.patch('/registrations/:id/status', adminAuth,updateRegistrationStatus);
router.post('/registrations/download', adminAuth ,downloadRegistrations);

export default router;