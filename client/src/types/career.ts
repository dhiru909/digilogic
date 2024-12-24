export interface Job {
    _id: string;
    title: string;
    description: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    location: string;
    skills: string[];
    postedDate: string;
  }
  
  export interface JobApplication {
    _id: string;
    jobId: string;
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
    resumeUrl: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    appliedDate: string;
  }