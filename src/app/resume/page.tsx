"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useAppSelector, useAppDispatch } from "@/lib/Redux/hooks";
import Navigation from "@/components/Navigation";
import TemplateModal from "@/components/listPage/TemplateModal";
import LoadingCircle from "@/components/LoadingCircle";
import Footer from "@/components/Footer";
import { GoPlus } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { SiGoogledocs } from "react-icons/si";
import { RiSparkling2Line } from "react-icons/ri";
import { HiDownload } from "react-icons/hi";

export default function ResumePage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const router = useRouter();
  const state = useAppSelector((state) => state.user);

  // 檢查登入狀態並獲得履歷資料
  useEffect(() => {
    if (state.profile.login) {
      console.log("登入中");
      const fetchResumes = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const querySnapshot = await getDocs(
              collection(db, "users", user.uid, "resumes")
            );
            let resumesData: any[] = await Promise.all(
              querySnapshot.docs.map(async (doc) => {
                const data = doc.data();
                const pdfExists = await checkPDFExists(user.uid, doc.id);
                return {
                  id: doc.id,
                  ...data,
                  pdfExists,
                };
              })
            );

            resumesData = resumesData.sort((a, b) => {
              return (
                new Date(b.lastEdited).getTime() -
                new Date(a.lastEdited).getTime()
              );
            });

            setResumes(resumesData);
            console.log(resumesData);
          }
        } catch (error) {
          console.error("Error fetching resumes:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchResumes();
    }
  }, [state.profile.login]);

  // 選擇模板
  const handleSelectTemplate = () => {
    setIsModalOpen(true);
  };

  // 建立新履歷
  const handleCreateResume = async (templateId: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "resumes"),
          {
            resumeName: "My Resume",
            createAt: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            name: "",
            birthDate: "",
            email: "",
            phone: "",
            profile: "",
            education: [],
            job: [],
            skill: [],
            sectionOrder: ["education", "job", "skill"],
            selectedTemplate: templateId,
            selectedColor: "#303030",
          }
        );
        router.push(`/resume/${docRef.id}/edit/`);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  // 刪除履歷
  const handleDelete = async (resumeId: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteDoc(doc(db, "users", user.uid, "resumes", resumeId));
        setResumes(resumes.filter((resume) => resume.id !== resumeId));
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  // 檢查是否有已存檔的履歷檔案
  const checkPDFExists = async (userId: string, resumeId: string) => {
    const pdfRef = ref(storage, `${userId}/${resumeId}/resumePDF.pdf`);

    try {
      await getDownloadURL(pdfRef);
      return true;
    } catch (error: any) {
      if (error.code === "storage/object-not-found") {
        return false;
      } else {
        throw error;
      }
    }
  };

  // 下載履歷檔案
  const downloadPDF = async (
    userId: string,
    resumeId: string,
    resumeName: string
  ) => {
    const pdfRef = ref(storage, `${userId}/${resumeId}/resumePDF.pdf`);
    try {
      setDownloading(resumeId);
      const url = await getDownloadURL(pdfRef);

      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${resumeName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setDownloading(null);
    }
  };

  // 處理日期格式
  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fafbfd]">
        <LoadingCircle size={48} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        body {
          background-color: #fafbfd;
        }
      `}</style>
      <Navigation />
      <div className="flex-grow p-10 m-auto w-full xl:w-[1200px]">
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-2xl">My Resumes</h1>
          <button
            onClick={handleSelectTemplate}
            className="purple-button py-1 px-3 flex items-center"
          >
            <GoPlus className="h-5 w-5 mr-1" />
            Create New
          </button>
        </div>
        <hr className="border mt-6 mb-6"></hr>
        {resumes.length === 0 ? (
          <div className="border border-gray-100 bg-white shadow-md shadow-gray-200 p-4 rounded flex flex-col items-center justify-center">
            <RiSparkling2Line className="h-4 w-4 text-indigo-500 opacity-30" />
            <SiGoogledocs className="h-7 w-7 text-indigo-500 opacity-30" />
            <p className="mt-3 text-center">You don’t have a resume yet.</p>
            <p className="text-sm text-gray-500 text-center mt-1">
              Custom-built, amazing resumes.
              <br />
              Empower your job search in just a few clicks!
            </p>
            <button
              onClick={handleSelectTemplate}
              className="white-button text-indigo-500 py-1 px-3 flex items-center mt-3"
            >
              <GoPlus className="h-5 w-5 mr-1" />
              Create resume
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
            {resumes.map((resume) => (
              <div key={resume.id}>
                <div className="h-40 border border-gray-100 bg-white shadow-md shadow-gray-200 p-4 rounded flex flex-col justify-between">
                  <div>
                    <p className="font-bold">{resume.resumeName}</p>
                    <p className="text-sm text-gray-500">
                      Last edited at&ensp;
                      {formatDate(resume.lastEdited)}
                      ・Create on&ensp;
                      {formatDate(resume.createAt)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Link href={`/resume/${resume.id}/edit`}>
                        <button className="flex items-center py-1 px-3 purple-button space-x-1">
                          <MdEdit />
                          <p>Edit</p>
                        </button>
                      </Link>
                      {resume.pdfExists && (
                        <button
                          className="flex items-center justify-center py-1 px-3 gray-button w-[72.8px]"
                          onClick={() =>
                            downloadPDF(
                              auth.currentUser?.uid ?? "",
                              resume.id,
                              resume.resumeName
                            )
                          }
                          disabled={downloading === resume.id}
                        >
                          {downloading === resume.id ? (
                            <LoadingCircle size={20} color="gray-500" />
                          ) : (
                            <>
                              <HiDownload />
                              <p>PDF</p>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <button
                      className="p-2 white-button"
                      onClick={() => handleDelete(resume.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <TemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTemplate={handleCreateResume}
      />
      <Footer />
    </div>
  );
}
