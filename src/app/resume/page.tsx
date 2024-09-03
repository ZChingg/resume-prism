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
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Navigation from "@/components/Navigation";
import TemplateModal from "@/components/listPage/TemplateModal";
import { GoPlus } from "react-icons/go";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { RiSparkling2Line } from "react-icons/ri";

export default function ResumePage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            console.log(querySnapshot.docs);
            let resumesData: any[] = querySnapshot.docs.map((doc) => ({
              // FIXME: 不該使用 any
              id: doc.id,
              ...doc.data(),
            }));

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

  // 處理日期格式
  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #f8f8f8;
        }
      `}</style>
      <Navigation />
      <div className="p-10 m-auto xl:w-[1200px]">
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-2xl font-bold">My Resumes</h1>
          <button
            onClick={handleSelectTemplate}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded flex items-center"
          >
            <GoPlus className="h-5 w-5 mr-1" />
            Create resume
          </button>
        </div>
        <hr className="border mt-6 mb-6"></hr>
        {resumes.length === 0 ? (
          <div className="border border-gray-100 bg-white shadow-md shadow-gray-200 p-4 rounded flex flex-col items-center justify-center">
            <RiSparkling2Line className="h-4 w-4 text-blue-600 opacity-30" />
            <SiGoogledocs className="h-7 w-7 text-blue-600 opacity-30" />
            <p className="mt-1 text-center">You don’t have a resume yet.</p>
            <p className="text-sm text-gray-500 text-center mt-1">
              Custom-built, amazing resumes.
              <br />
              Empower your job search in just a few clicks!
            </p>
            <button
              onClick={handleSelectTemplate}
              className=" hover:bg-gray-100 text-blue-600 py-1 px-4 rounded flex items-center mt-3"
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
                      {resume.lastEdited ? (
                        <>
                          Last edited at&ensp;
                          {formatDate(resume.lastEdited)}
                        </>
                      ) : (
                        <>
                          Last edited at&ensp;
                          {formatDate(resume.createAt)}
                        </>
                      )}
                      ・Create on&ensp;
                      {formatDate(resume.createAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Link href={`/resume/${resume.id}/edit`}>
                      <button className="flex items-center py-1 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded space-x-1">
                        <FaEdit />
                        <p>Edit</p>
                      </button>
                    </Link>
                    <button
                      className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
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
    </>
  );
}
