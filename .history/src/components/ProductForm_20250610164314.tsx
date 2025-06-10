
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    categoryId: product?.categoryId || "",
    featured: product?.featured || "",
    colorsList: product?.colorsList || "",
    imagesList: product?.imagesList || "",
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
    
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    const finalFormData = {
      product_id: Date.now(), 
      name,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      featured: featured ? "true" : "false",
      colorsList: colorsList.join(", "),
      imagesList: imageUrl, 
    };
  
    const { error } = await supabase.from("Products").upsert(finalFormData);
    if (error) {
      console.error("Error saving product:", error);
    } else {
      console.log("Product saved successfully!");
    }
  };
  

  const handleColorChange = (color: string) => {
    const current = formData.colorsList
      ? formData.colorsList.split(",").map((c) => c.trim())
      : [];
    const updated = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color];
    setFormData({ ...formData, colorsList: updated.join(", ") });
  };
  

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setSelectedFile(file);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_unsigned_preset"); // ⚠️ Thay bằng preset của bạn
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => {
              const isSelected = selectedColors.includes(color.name);
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleColorChange(color.name)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    isSelected ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              );
            })}
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop or click to upload images
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
            />
            {imageUrl && (
  <div className="mt-2">
    <p className="text-sm text-gray-700">Image uploaded:</p>
    <img src={imageUrl} alt="Uploaded" className="h-32 rounded-lg" />
  </div>
)}
              <label
                htmlFor="image-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Choose Images
              </label>
            </div>

            {selectedFile && (
              <div className="mt-4 text-left">
                <p className="text-sm font-medium text-gray-700 mb-1">Selected Image:</p>
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
              </div>
            )}
            {!selectedFile && product?.imagesList && (
              <img
                src={product.imagesList}
                alt="Current"
                className="mt-4 rounded-lg w-32 h-32 object-cover"
              />
            )}
          </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {product ? 'Update' : 'New'}
          </button>
        </div>
      </form>
    </div>
  );
};
