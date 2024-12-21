import { Request, Response } from 'express';
import { Enquiry } from '../models/Enquiry';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../middleware/errorHandler';
import { IEnquiry } from '../types/enquiry';

// Get all enquiries
export const getEnquiries = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.query);
    
  const enquiries = await Enquiry.find({
    status: { $in: req.query.status }
  }).populate("productId", "name").sort({ createdAt: -1 });
  res.json(enquiries);
});

// Create new enquiry
export const createEnquiry = asyncHandler(async (req: Request<{}, {}, IEnquiry>, res: Response) => {
  const enquiry = new Enquiry(req.body);
  const newEnquiry = await enquiry.save();
  res.status(201).json(newEnquiry);
});

// Update enquiry status
export const updateEnquiryStatus = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    throw new AppError(404, 'Enquiry not found');
  }

  enquiry.status = req.body.status;
  const updatedEnquiry = await enquiry.save();
  res.json(updatedEnquiry);
});

// Delete enquiry
export const deleteEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    throw new AppError(404, 'Enquiry not found');
  }

  await enquiry.deleteOne();
  res.json({ message: 'Enquiry deleted' });
});