export interface Enquiry {
    _id: string;
    name:string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
    productId:string;
    status: 'new' | 'read' | 'replied';
  }
  export type Cate =  'new' | 'read' | 'replied';
export interface EnquiryFilterType{
    category:  Cate[];
}