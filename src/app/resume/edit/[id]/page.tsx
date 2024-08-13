"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import { FiArrowLeft } from "react-icons/fi";

export default function EditResume() {
  const router = useRouter();
  const { id } = useParams();
  const [resumeData, setResumeData] = useState<any>({
    name: "",
    birthDate: "",
    email: "",
    phone: "",
    website: "",
    websiteLink: "",
    profile: "",
    experience: [],
    education: [],
    skill: [],
  });

  // 從 Firestore 獲取對應的履歷資料
  useEffect(() => {
    const fetchResumeData = async () => {
      if (id) {
        const docRef = doc(db, "resumes", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setResumeData(docSnap.data());
        }
      }
    };
    fetchResumeData();
  }, [id]);

  // 更改履歷
  const handleFormChange = (data: any) => {
    setResumeData(data);
  };

  // 儲存履歷
  const handleSave = async () => {
    if (id) {
      await setDoc(doc(db, "resumes", id as string), resumeData);
      router.push("/resume");
    }
  };

  return (
    <>
      {/* TODO: 版面擴張到全部，然後右側用 sticky 定住，就可以實現拉霸在右側 */}
      <div className="navigation">
        <Link href="/resume">
          <button className="hover:bg-gray-100 text-blue-700 py-2 px-4 rounded h-10 flex items-center">
            <FiArrowLeft className="h-5 w-5 mr-1"/>
            返回列表
          </button>
        </Link>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-auto h-10"
          onClick={handleSave}
        >
          編輯完成
        </button>
      </div>
      <div className="grid grid-cols-2 h-screen">
        {/* 左側區塊：可滾動的表單 */}
        <div className=" p-14">
          <ResumeForm onChange={handleFormChange} initialData={resumeData} />
        </div>

        {/* 右側區塊：固定的履歷預覽 */}
        <div className="bg-gray-500 flex justify-center">
          <div className="bg-white mt-10 w-[210mm] h-[297mm] p-10 shadow-lg border border-gray-300">
            <ResumeTemplate data={resumeData} />
          </div>
        </div>
      </div>
    </>
  );
}
