"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth, storage } from "@/lib/firebase";
import { ref, uploadBytes, uploadString } from "firebase/storage";
import ResumeForm from "@/components/editPage/ResumeForm";
import ResumePreview from "@/components/editPage/ResumePreview";
import DownloadPDF from "@/components/editPage/DownloadPDF";
import Navigation from "@/components/Navigation";
import { FiArrowLeft } from "react-icons/fi";
import { RiFileDownloadLine } from "react-icons/ri";
import { useAppSelector } from "@/lib/Redux/hooks";
import { generatePDF } from "@/lib/pdf";

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

  // 儲存履歷
  const handleSave = async () => {
    if (id) {
      const user = auth.currentUser;
      if (user) {
        try {
          // 將履歷檔案上傳至 storage
          const input = resumeRef.current;
          const result = await generatePDF(input);

          if (result) {
            const { pdf, imgData } = result;
            const pdfBlob = pdf.output("blob");

            const storageRef = ref(storage, `${user.uid}/${id}/resumePDF.pdf`);
            const metadata = {
              contentType: "application/pdf",
              contentDisposition: `attachment; filename="resumePDF.pdf"`,
            };
            const imageRef = ref(storage, `${user.uid}/${id}/resumeImage.png`);

            await uploadBytes(storageRef, pdfBlob, metadata);
            await uploadString(imageRef, imgData.split(",")[1], "base64");

            // 更新資料至 firestore
            await setDoc(doc(db, "users", user.uid, "resumes", id as string), {
              ...resumeData,
              lastEdited: new Date().toISOString(),
            });

            router.push("/resume");
          }
        } catch (error) {
          console.error("Error saving resume and uploading files:", error);
        }
      }
    }
  };

  // 更換模板與顏色
  const handleTemplateChange = (change: {
    templateId?: string;
    color?: string;
  }) => {
    const updatedData = { ...resumeData };
    if (change.templateId) {
      updatedData.selectedTemplate = change.templateId;
    }
    if (change.color) {
      updatedData.selectedColor = change.color;
    }
    setResumeData(updatedData);
  };

  // 下載 PDF
  const resumeRef = useRef<HTMLDivElement>(null);
  const exportPDF = async () => {
    const input = resumeRef.current;
    const result = await generatePDF(input);

    if (result) {
      const { pdf } = result;
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
        <Navigation handleSave={handleSave} exportPDF={exportPDF} id={id} />
        <div className="flex flex-1 h-full relative overflow-hidden outline-none flex-row left-0 right-0 ">
          <ResumeForm onChange={handleFormChange} initialData={resumeData} />
          <ResumePreview
            data={resumeData}
            onTemplateChange={handleTemplateChange}
          />
          <DownloadPDF ref={resumeRef} data={resumeData} />
        </div>
      </div>
    </>
  );
}
