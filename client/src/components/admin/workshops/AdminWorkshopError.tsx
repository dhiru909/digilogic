import { AlertCircle } from 'lucide-react';

interface AdminWorkshopErrorProps {
  message: string;
}

export default function AdminWorkshopError({ message }: AdminWorkshopErrorProps) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}