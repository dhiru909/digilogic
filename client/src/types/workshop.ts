export type WorkshopStatus = 'upcoming' | 'ongoing' | 'completed'
export interface Workshop {
    _id: string;
    title: string;
    description: string;
    date: string;
    duration: string;
    capacity: number;
    registeredCount: number;
    location: string;
    instructor: string;
    price: number;
    image: string;
    link?:string;
    status: WorkshopStatus
  }
  
  export interface WorkshopRegistration {
    _id: string;
    workshopId: string;
    userId: string;
    userName: string;
    email: string;
    phone: string;
    registrationDate: string;
    status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'refunded';
    paymentProof?: string;
  }