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
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

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
        <>
          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
            <Image
              src={preview}
              alt="Profile"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex flex-col w-[102.14px]">
            {uploading ? (
              <p className="text-gray-400">Uploading....</p>
            ) : (
              <>
                <label className="text-blue-500  hover:text-blue-800 cursor-pointer flex items-center">
                  <MdEdit className="mr-1" />
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
                  className="text-gray-400 hover:text-black cursor-pointer text-left flex items-center"
                >
                  <FaTrashAlt className="mr-1" />
                  Delete
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          {uploading ? (
            <>
              <div className=" bg-gray-100 h-16 w-16 p-5 rounded">
                <div className="animate-spin text-gray-300 h-6 w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-full h-full text-gray-500"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span className="text-gray-400 w-[102.14px]">Uploading....</span>
            </>
          ) : (
            <>
              <label className="cursor-pointer flex items-center group">
                <input
                  type="file"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <FaUser
                  className="text-gray-300 bg-gray-100 h-16 w-16 p-5 rounded 
                hover:text-blue-500 hover:bg-sky-100 group-hover:text-blue-500 group-hover:bg-sky-100"
                />
                <span className="ml-4 text-blue-500 hover:text-blue-800 group-hover:text-blue-800">
                  Upload photo
                </span>
              </label>
            </>
          )}
        </>
      )}
    </div>
  );
}
