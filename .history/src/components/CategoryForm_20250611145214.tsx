import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface CategoryFormProps {
  category?: any;
  onClose: () => void;
  onSave: () => void;
}

export const CategoryForm = ({ category, onClose, onSave }: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: category?.name || "",
    iconPath: category?.iconPath || "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "homz"); 

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dta5lkfxr/image/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setFormData({ ...formData, iconPath: data.secure_url });
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Error uploading image.", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        iconPath: formData.iconPath,
      };

      let result;
      if (category) {
        result = await supabase
          .from("Categories")
          .update(payload)
          .eq("category_id", category.category_id);
      } else {
        result = await supabase.from("Categories").insert(payload);
      }

      if (result.error) {
        console.error("Error saving category:", result.error);
        alert("Error saving category: " + result.error.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        onSave();
        onClose();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {category ? "Edit Category" : "Add New Category"}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Icon</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
            {formData.iconPath && (
              <div className="mt-4">
                <img src={formData.iconPath} alt="Icon Preview" className="h-16 w-16 rounded-lg border" />
                <p className="text-xs text-gray-500 mt-2 break-all">{formData.iconPath}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : category ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};
