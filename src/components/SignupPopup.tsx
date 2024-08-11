"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";
import { setLogin } from "@/lib/features/userSlice";

export default function SignupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log(user);

      //  FireBase 更新使用者 displayName
      await updateProfile(user, {
        displayName: name,
      });

      // Redux 管理登入狀態
      dispatch(
        setLogin({ name: user.displayName!, email: user.email!, login: true })
      );

      // FireStore 儲存使用者資訊
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        name: user.displayName,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded h-10 ml-3"
      >
        註冊
      </button>

      {isOpen && (
        <div
          onClick={closePopup}
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 size-full"
        >
          <div className="relative bg-white p-8 rounded shadow-lg w-[400px]">
            <IoClose
              onClick={togglePopup}
              className="absolute top-4 right-4 h-7 w-7 p-1  text-gray-600 rounded cursor-pointer hover:bg-gray-100"
            />
            <h2 className="text-lg font-bold mb-4 text-center">歡迎加入！</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="您的名字"
                  value={name}
                  className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="電子郵件"
                  value={email}
                  className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="密碼"
                  className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                註冊
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              已經註冊過了？
              <a href="#" className="text-green-500 hover:underline">
                {" "}
                登入
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
