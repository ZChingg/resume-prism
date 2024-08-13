"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setLogout } from "@/lib/features/userSlice";

export default function ResumePage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // 檢查登入狀態並獲得履歷資料
  useEffect(() => {
    if (state.profile.login) {
      console.log("登入中");
      const fetchResumes = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const querySnapshot = await getDocs(
              collection(db, "users", user.uid, "resumes"),
            );
            console.log(querySnapshot.docs);
            const resumesData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setResumes(resumesData);
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

  // 建立新履歷
  const handleCreateResume = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "resumes"),
          {
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
          }
        );
        router.push(`/resume/edit/${docRef.id}`);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  // 登出
  const handleLogout = async () => {
    dispatch(setLogout());
    auth.signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="navigation">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded h-10"
          onClick={handleLogout}
        >
          登出系統
        </button>
      </div>
      <div className="p-10">
        <h1 className="text-2xl mb-4">Your Resumes</h1>
        {resumes.length === 0 ? (
          <p>No resumes found. Create a new resume to get started!</p>
        ) : (
          <ul>
            {resumes.map((resume) => (
              <li key={resume.id} className="mb-2">
                <Link href={`/resume/edit/${resume.id}`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Edit Resume {resume.id}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleCreateResume}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
        >
          Create New Resume
        </button>
      </div>
    </>
  );
}
