
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface User {
  // id: string;
  email: string;
  name: string;
  // joinedDate:Date
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
}
export interface JobApplicationDetails {
  _id: string;
  jobId: {
    _id: string;
    title: string;
  };
  coverLetter: string;
  resumeUrl: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  appliedDate: string;
}
export interface EnquiryDetails {
  _id: string;
  message: string;
  createdAt: string;
  productId: { _id: string; name: string };
  status: "new" | "read" | "replied";
}
export interface Details {
  user: User;
  applications: JobApplicationDetails[];
  enquiries: EnquiryDetails[];
}
