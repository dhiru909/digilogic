import { Router } from 'express';
import {
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
} from '../controllers/enquiryController';
import rateLimiter from '../middleware/rateLimiter';
import { userAuth } from '../middleware/userAuth';

const router = Router();

router.get('/', getEnquiries);
router.post('/', userAuth,createEnquiry);
router.patch('/:id/status', updateEnquiryStatus);
router.delete('/:id', deleteEnquiry);

export default router;