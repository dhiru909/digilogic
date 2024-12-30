import { AlertCircle } from 'lucide-react';

interface WorkshopErrorProps {
  message: string;
}

export default function WorkshopError({ message }: WorkshopErrorProps) {
  return (
    <div className="text-center py-12">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}