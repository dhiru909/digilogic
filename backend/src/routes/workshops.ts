import { Router } from 'express';
// import { auth } from '../middleware/auth';
import { adminAuth } from '../middleware/adminAuth';
import {
  getWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  registerForWorkshop,
  getWorkshopRegistrations,
  updateRegistrationStatus,
  downloadRegistrations
} from '../controllers/workshopController';
import { userAuth } from '../middleware/userAuth';
import multer from 'multer';

const router = Router();
const upload = multer({
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (_, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  });
// Public routes
router.get('/', getWorkshops);

// Protected routes
router.post('/:id/register', userAuth, upload.single('paymentProof'), registerForWorkshop);

// Admin routes
// router.use(auth, adminAuth);
router.post('/', adminAuth,createWorkshop);
router.put('/:id',adminAuth, updateWorkshop);
router.delete('/:id', adminAuth,deleteWorkshop);
router.get('/:workshopId/registrations', adminAuth,getWorkshopRegistrations);
router.patch('/registrations/:id/status', adminAuth,updateRegistrationStatus);
router.post('/registrations/download', adminAuth ,downloadRegistrations);

export default router;