import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Workshop, WorkshopStatus } from "../../../types/workshop";
import { createWorkshop, updateWorkshop } from "../../../services/api";
import ImageUpload from "../products/ImageUpload";
import { uploadImage } from "../../../services/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkshopFormProps {
  workshop?: Workshop | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WorkshopForm({
  workshop,
  onClose,
  onSuccess,
}: WorkshopFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    capacity: "",
    location: "",
    instructor: "",
    price: "",
    link: "",
    status: "upcoming" as WorkshopStatus,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (workshop) {
      console.log(workshop);

      setFormData({
        title: workshop.title,
        description: workshop.description,
        date:
          new Date(workshop.date).toISOString().split("T")[0] +
          " " +
          new Date(workshop.date).toISOString().split("T")[1].substring(0, 5),
        duration: workshop.duration,
        capacity: workshop.capacity.toString(),
        location: workshop.location,
        instructor: workshop.instructor,
        price: workshop.price.toString(),
        link: workshop.link!,
        status: workshop.status,
      });
      setPreviewUrl(workshop.image);
    }
  }, [workshop]);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let imageUrl = workshop?.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const workshopData = {
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        image: imageUrl,
      };

      if (workshop) {
        await updateWorkshop(workshop._id, workshopData);
      } else {
        await createWorkshop(workshopData);
      }
      onSuccess();
    } catch (err) {
      setError("Error saving workshop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-20 overflow-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {workshop ? "Edit Workshop" : "Add Workshop"}
          </h2>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              //   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full bg-background rounded-lg"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <Input
                type="datetime-local"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full"
                // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <Input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 2 hours"
                // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className=" flex flex-row space-x-2 items-center ">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                //   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Workshop Link
              </label>
              <Input
                type="link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                //   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <div>
              <label
                htmlFor="instructor"
                className="block text-sm font-medium text-gray-700 "
              >
                Instructor
              </label>
              <Input
                id="instructor"
                type="text"
                placeholder="Instructor Name"
                value={formData.instructor}
                onChange={(e) =>
                  setFormData({ ...formData, instructor: e.target.value })
                }
                //   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="instructor"
                className="block text-sm font-medium text-gray-700 "
              >
                Instructor
              </label>
              <Select
                onValueChange={(e) =>
                  setFormData({ ...formData, status: e as WorkshopStatus })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <ImageUpload
              onImageSelect={handleImageSelect}
              previewUrl={previewUrl}
              onClear={() => {
                setImageFile(null);
                setPreviewUrl("");
              }}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-primary rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Saving..." : workshop ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
