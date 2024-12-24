import mongoose from 'mongoose';
import { IEnquiryDocument } from '../types/enquiry';

const enquirySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  phone: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// postSchema.pre('remove', async function(next) {

//     const user = await User.findById(this.author);
  
//     if (user) {
  
//       await Post.deleteMany({ author: user._id }); // Delete all posts related to the user
  
//     }
  
//     next();
  
//   });
export const Enquiry = mongoose.model<IEnquiryDocument>('Enquiry', enquirySchema);