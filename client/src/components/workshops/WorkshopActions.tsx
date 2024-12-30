interface WorkshopActionsProps {
    price: number;
    isFullyBooked: boolean;
    onRegister: () => void;
  }
  
  export default function WorkshopActions({ price, isFullyBooked, onRegister }: WorkshopActionsProps) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-blue-600">
          ${price.toFixed(2)}
        </span>
        <button
          onClick={onRegister}
          disabled={isFullyBooked}
          className={`px-4 py-2 rounded-lg ${
            isFullyBooked
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isFullyBooked ? 'Fully Booked' : 'Register Now'}
        </button>
      </div>
    );
  }