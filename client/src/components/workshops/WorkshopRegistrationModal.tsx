// import { useState } from "react";
// import { X } from "lucide-react";
// import { Workshop } from "../../types/workshop";
// import { registerForWorkshop } from "../../services/api";

// interface WorkshopRegistrationModalProps {
//   workshop: Workshop;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export default function WorkshopRegistrationModal({
//   workshop,
//   onClose,
//   onSuccess,
// }: WorkshopRegistrationModalProps) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await registerForWorkshop(workshop._id);
//       onSuccess();
//     } catch (err) {
//       setError("Failed to register for workshop. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-background border m-3 rounded-lg p-8 max-w-md w-full">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Workshop Registration</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <div className="mb-6">
//           <h3 className="font-semibold mb-2">{workshop.title}</h3>
//           <p className="text-gray-600">{workshop.description}</p>
//           <div className="mt-4">
//             <p className="text-lg font-semibold">
//               Price: ₹{workshop.price.toFixed(2)}
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
//           >
//             {loading ? "Processing..." : "Confirm Registration"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { Workshop } from "../../types/workshop";
import { registerForWorkshop } from "../../services/api";
import { Input } from "../ui/input";

interface WorkshopRegistrationModalProps {
  workshop: Workshop;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WorkshopRegistrationModal({
  workshop,
  onClose,
  onSuccess,
}: WorkshopRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentProof) {
      setError("Please upload payment proof");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("paymentProof", paymentProof);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await registerForWorkshop(workshop._id, formDataToSend);
      onSuccess();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to register for workshop"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Workshop Registration</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold mb-2">{workshop.title}</h3>
          <p className="text-gray-600 mb-4">{workshop.description}</p>
          <p className="text-lg font-semibold">
            Price: ₹{workshop.price.toFixed(2)}
            
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              //   className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              //   className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              //   className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Proof
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setPaymentProof(e.target.files?.[0] || null)
                      }
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            </div>
            {paymentProof && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {paymentProof.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Submit Registration"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
