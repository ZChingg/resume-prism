"use client";

import { useState } from "react";
import ResumeForm from "@/components/resumes/ResumeForm";
import ResumeTemplate from "@/components/ResumeTemplate";

export default function Home() {
  const [resumeData, setResumeData] = useState({
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

  const handleFormChange = (data: any) => {
    setResumeData(data);
  };

  return (
    <>
      {/* TODO: 版面擴張到全部，然後右側用 sticky 定住，就可以實現拉霸在右側 */}
      <div className="navigation">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-auto h-10">
          編輯完成
        </button>
      </div>
      <div className="grid grid-cols-2 h-screen">
        {/* 左側區塊：可滾動的表單 */}
        <div className=" p-14">
          <ResumeForm onChange={handleFormChange} />
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
