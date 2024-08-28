"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import ResumeForm from "@/components/editPage/ResumeForm";
import ResumeTemplate from "@/components/editPage/ResumeTemplate";
import Sidebar from "@/components/editPage/Sidebar"; // 导入新的 Sidebar 组件
import { FiArrowLeft } from "react-icons/fi";
import { RiFileDownloadLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAppSelector } from "@/lib/hooks";

export default function EditResume() {
  const router = useRouter();
  const { id } = useParams();
  const user = useAppSelector((state) => state.user).profile;
  const [resumeData, setResumeData] = useState<any>({});

  // 從 Firestore 獲取對應的履歷資料
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        if (id && user.login) {
          const user = auth.currentUser;
          if (user) {
            const docRef = doc(db, "users", user.uid, "resumes", id as string);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setResumeData(docSnap.data());
            } else {
              router.push("/");
            }
          } else {
            console.log("No authenticated user found.");
          }
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };
    fetchResumeData();
  }, [id, user, router]);

  // 更改履歷內容
  const handleFormChange = (data: any) => {
    setResumeData(data);
  };

  // 更改履歷名字
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeData({ ...resumeData, resumeName: e.target.value });
  };
  // 點擊 icon 全選履歷名字
  const inputRef = useRef<HTMLInputElement>(null);
  const handleIconClick = () => {
    inputRef.current?.select();
  };

  // 儲存履歷
  const handleSave = async () => {
    if (id) {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid, "resumes", id as string), {
          ...resumeData,
          lastEdited: new Date().toISOString(),
        });
        router.push("/resume");
      }
    }
  };

  // 更換模板
  const handleTemplateChange = (templateId: string) => {
    setResumeData({ ...resumeData, selectedTemplate: templateId });
  };

  // 匯出 PDF // html2canvas 將 HTML 轉為圖像，jspdf 導出為 pdf 檔
  const resumeRef = useRef<HTMLDivElement>(null);
  const exportPDF = async () => {
    const input = resumeRef.current;

    if (input) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        compress: false,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width - 1;
      console.log(imgHeight); // 842....
      console.log(imgProps.height); //1684

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight); // 移除 'null' 参数
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight); // 移除 'null' 参数
        heightLeft -= pdfHeight;
      }

      pdf.save(`${resumeData.resumeName}.pdf`);
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          overflow: hidden;
          height: 100vh;
          touch-action: none;
          overscroll-behavior: none;
        }
      `}</style>
      <div className="flex flex-col z-50 inset-0 fixed">
        <div className="relative flex h-16	bg-white shadow-md items-center px-16 z-10 top-0 justify-end;">
          <Link href="/resume">
            <button className="hover:bg-gray-100 text-blue-700 py-2 px-4 rounded h-10 flex items-center mr-1">
              <FiArrowLeft className="h-5 w-5 mr-1" />
              Back
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
            Finish
          </button>
          <button
            className="text-gray-400 hover:text-blue-500 rounded ml-4"
            onClick={exportPDF}
          >
            <RiFileDownloadLine className="h-5 w-5" />
            <p className="font-medium text-xs">PDF</p>
          </button>
        </div>
        <div className="flex flex-1 h-full relative overflow-hidden outline-none flex-row left-0 right-0 ">
          <Sidebar onChange={handleTemplateChange} />
          <ResumeForm onChange={handleFormChange} initialData={resumeData} />
          <ResumeTemplate ref={resumeRef} data={resumeData} />
        </div>
      </div>
    </>
  );
}
