import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSave: () => void;
}

const colorOptions = [
  { name: "Red", hex: "#F44336" },
  { name: "Green", hex: "#4CAF50" },
  { name: "Blue", hex: "#2196F3" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Purple", hex: "#9C27B0" },
  { name: "Orange", hex: "#FF9800" },
  { name: "Indigo", hex: "#3F51B5" },
  { name: "Teal", hex: "#009688" },
  { name: "Grey", hex: "#9E9E9E" },
  { name: "Amber", hex: "#FFC107" },
  { name: "Cyan", hex: "#00BCD4" },
  { name: "Brown", hex: "#795548" },
  { name: "Lime", hex: "#CDDC39" },
  { name: "Pink", hex: "#E91E63" },
  { name: "Yellow", hex: "#FFEB3B" },
];

export const ProductForm = ({ product, onClose, onSave }: ProductFormProps) => {
  const [categories, setCategories] = useState<{ category_id: number; name: string }[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    categoryId: product?.categoryId || "",
    featured: product?.featured || "",
    colorsList: product?.colorsList || "",
    imagesList: product?.imagesList || ""
  });

  const selectedColors = formData.colorsList
    ? formData.colorsList.split(",").map((c) => c.trim())
    : [];

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("Categories").select("category_id, name");
      if (data) setCategories(data);
      else console.error("Error loading categories:", error);
    };

    fetchCategories();

    // Load existing image if editing
    if (product?.imagesList) {
      const url = product.imagesList.trim();
      setUploadedFiles([{ url, name: url.split("/").pop() || "image" }]);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving product:", formData);
    onSave();
  };

  const handleColorChange = (color: string) => {
    const currentColors = selectedColors;
    const updatedColors = currentColors.includes(color)
      ? currentColors.filter((c) => c !== color)
      : [...currentColors, color];
    setFormData({ ...formData, colorsList: updatedColors.join(", ") });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from("images").upload(fileName, file);

    if (data) {
      const imageUrl = supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl;
      const newFile = { url: imageUrl, name: file.name };

      setUploadedFiles([newFile]);
      setFormData({ ...formData, imagesList: imageUrl });
    } else {
      console.error("Upload failed:", error);
    }
  };

  const handleRemoveImage = () => {
    setUploadedFiles([]);
    setFormData({ ...formData, imagesList: "" });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (VND)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: +e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
            <input
              type="text"
              value={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
          <div className="flex flex-wrap gap-2">
           
