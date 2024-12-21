export interface Enquiry {
    id: string;
    name:string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
    productId:string;
    status: 'new' | 'read' | 'replied';
  }