"use client";

import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { imageFileToStoredData } from "@/lib/image-files";

export function ImageUploadField({
  value,
  onChange,
  label = "الصورة",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const choose = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      onChange(await imageFileToStoredData(file));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "تعذر رفع الصورة.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="single-image-upload">
      <span className="single-image-label">{label}</span>
      <label className="single-image-picker">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={uploading}
          onChange={(event) => {
            const input = event.currentTarget;
            void choose(input.files?.[0]).finally(() => { input.value = ""; });
          }}
        />
        {value ? (
          <img src={value} alt={`معاينة ${label}`} />
        ) : (
          <span><ImagePlus /> اختر صورة من الهاتف</span>
        )}
        <b><UploadCloud /> {uploading ? "جارٍ تجهيز الصورة..." : value ? "اضغط لتغيير الصورة" : "اضغط لاختيار الصورة"}</b>
      </label>
      {value && <button type="button" className="remove-uploaded-image" onClick={() => onChange("")}><Trash2 /> حذف الصورة</button>}
      {error && <small className="upload-error">{error}</small>}
    </div>
  );
}
