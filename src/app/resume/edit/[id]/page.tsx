"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import { FiArrowLeft } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

export default function EditResume() {
  const router = useRouter();
  const { id } = useParams();
  const [resumeData, setResumeData] = useState<any>({
    resumeName: "我的新履歷",
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
  console.log(resumeData);

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

  // 更改履歷名字
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({ ...resumeData, resumeName: e.target.value });
  };

  // 儲存履歷
  const handleSave = async () => {
    if (id) {
      await setDoc(doc(db, "resumes", id as string), resumeData);
      router.push("/resume");
    }
  };

  // 點擊 icon 修改履歷名
  const inputRef = useRef<HTMLInputElement>(null);
  const handleIconClick = () => {
    inputRef.current?.select();
  };

  return (
    <>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
      <div className="navigation">
        <Link href="/resume">
          <button className="hover:bg-gray-100 text-blue-700 py-2 px-4 rounded h-10 flex items-center">
            <FiArrowLeft className="h-5 w-5 mr-1" />
            返回列表
          </button>
        </Link>
        <input
          type="text"
          value={resumeData.resumeName}
          ref={inputRef}
          onChange={handleNameChange}
          className="font-bold border-b-2 focus:outline-none focus:border-blue-500 "
        />
        <FaEdit
          onClick={handleIconClick}
          className="ml-2 cursor-pointer text-gray-400 hover:text-blue-500"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-auto h-10"
          onClick={handleSave}
        >
          編輯完成
        </button>
      </div>
      <div className="flex h-screen overflow-hidden bg-gray-500">
        {/* 左側區塊：可滾動的表單 */}
        <div className="bg-white w-1/2 pt-6 p-16 overflow-y-scroll">
          <ResumeForm onChange={handleFormChange} initialData={resumeData} />
        </div>

        {/* 右側區塊：固定的履歷預覽 */}
        <div className="w-1/2 bg-gray-500 flex justify-center overflow-y-auto items-start">
          <div
            className="bg-white mt-8 m-10 p-7 shadow-lg border justify-center"
            style={{
              maxWidth: "595px",
              minHeight: "842px",
              height: "auto",
            }}
          >
            <ResumeTemplate data={resumeData} />
          </div>
        </div>
      </div>
    </>
  );
}
