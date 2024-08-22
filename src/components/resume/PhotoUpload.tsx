import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface PhotoUploadProps {
  photoURL?: string;
  onChange: (url: string) => void;
}

export default function PhotoUpload({ photoURL, onChange }: PhotoUploadProps) {
  const { id } = useParams();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(photoURL);

  useEffect(() => {
    if (photoURL) {
      setPreview(photoURL);
    }
  }, [photoURL]);

  // 上傳照片到 Storage 並拿到他的 URL
  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `headshots/${id}/headshots`);

      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      // 更新圖片與上傳狀態
      setPreview(photoURL);
      setUploading(false);

      // 將 URL 回傳給父组件
      onChange(photoURL);
    }
  };

  // 刪除 Storage 照片
  const handlePhotoDelete = async () => {
    if (preview) {
      const storageRef = ref(storage, `headshots/${id}/headshots`);
      await deleteObject(storageRef);
      setPreview("");
      onChange("");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {preview ? (
        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
          <Image
            src={preview}
            alt="Profile"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ) : (
        <label className="cursor-pointer w-16 h-16 bg-gray-100 rounded flex items-center justify-center hover:bg-sky-100 group/user">
          <input
            type="file"
            id="fileInput"
            onChange={handlePhotoUpload}
            className="hidden"
            disabled={uploading}
          />
          <FaUser className="text-gray-300 h-6 w-6 group-hover/user:text-blue-500 hover:text-blue-500" />
        </label>
      )}
      <div className="flex flex-col">
        {uploading ? (
          <p className="text-gray-400">Uploading...</p>
        ) : preview ? (
          <>
            <label className="text-blue-500 cursor-pointer hover:text-blue-800">
              Edit photo
              <input
                type="file"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            <button
              type="button"
              onClick={handlePhotoDelete}
              className="text-gray-400 hover:text-black cursor-pointer text-left"
            >
              Delete
            </button>
          </>
        ) : (
          <label className="text-blue-500 cursor-pointer hover:text-blue-800">
            Upload photo
            <input
              type="file"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}
