import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
} from '../controllers/productController';
import multer from 'multer';
import path from 'path';
import { adminAuth } from '../middleware/adminAuth';
export const uploadImage = multer({
  limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif/
      const extname = allowedTypes.test(
          path.extname(file.originalname).toLowerCase()
      )
      const mimetype = allowedTypes.test(file.mimetype)

      if (extname && mimetype) {
          return cb(null, true)
      }
      cb(new Error('Only image files are allowed!'))
  },
})
const router = Router();

router.get('/', adminAuth,getProducts);
router.post('/', adminAuth,createProduct);
router.put('/:id', adminAuth,updateProduct);
router.delete('/:id', adminAuth,deleteProduct);
router.post("/image",uploadImage.single("image"),uploadProductImage)
export default router;