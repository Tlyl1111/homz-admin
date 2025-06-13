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
    uploadData.append("upload_preset", "unsigned_preset"); // 🔁 Thay bằng preset thật

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/myshopabc/image/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, iconPath: data.secure_url }));
      } else {
        console.error("Image upload failed:", data);
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e:
