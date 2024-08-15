import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface UploadProfilePicProps {
  userId: any; // 用於連結照片到對應用戶的履歷
  resumeId: any; // 用於連結照片到對應的履歷
}

export default function UploadProfilePic({
  userId,
  resumeId,
}: UploadProfilePicProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const storageRef = ref(storage, `profile_pics/${userId}/${resumeId}.jpg`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);

    const resumeRef = doc(db, "resumes", resumeId);
    await updateDoc(resumeRef, {
      photoUrl: downloadURL,
    });

    alert("照片已上傳並更新至履歷！");
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>上傳照片</button>
    </div>
  );
}
