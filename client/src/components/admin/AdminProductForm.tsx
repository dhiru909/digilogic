import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Product } from "../../types/index";
import { createProduct, updateProduct, uploadImage } from "../../services/api";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "./products/ImageUpload";
interface AdminProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminProductForm({
  product,
  onClose,
  onSuccess,
}: AdminProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image as unknown as string,
        category: product.category,
      });
    }
  }, [product]);
  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = product?.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }else{
        return;
      }
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        image:imageUrl
      };

      if (product) {
        await updateProduct(product._id, productData);
      } else {
        // @ts-ignore
        await createProduct(productData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="fixed overflow-y-scroll z-20  inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-background rounded-lg p-4 max-w-md w-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary">
              Name
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className=""
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="lex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">
              Price
            </label>
            <Input
              type="number"
              value={formData.price}
              style={{}}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className=""
              min="0"
              // step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <ImageUpload
              onImageSelect={handleImageSelect}
              previewUrl={previewUrl}
              onClear={previewUrl ? clearImage : undefined}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">
              Category
            </label>
            <Select
              onValueChange={(e) => setFormData({ ...formData, category: e })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Starter Kits">Starter Kits</SelectItem>
                  <SelectItem value="Advanced Kits">Advanced Kits</SelectItem>
                  <SelectItem value="Educational Boards">
                    Educational Boards
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-primary hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-primary rounded-md hover:bg-blue-700"
            >
              {product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
