"use client"

import { useState } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResumeTemplate from "@/components/ResumeTemplate";

export default function Home() {
  const [resumeData, setResumeData] = useState({});

  const handleFormChange = (data: any) => {
    setResumeData(data);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <ResumeForm onChange={handleFormChange} />
      </div>
      <div>
        <ResumeTemplate data={resumeData} />
      </div>
    </div>
  );
}
