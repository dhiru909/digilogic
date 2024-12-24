import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract']
  },
  location: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  postedDate: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

export const Job = mongoose.model('Job', jobSchema);