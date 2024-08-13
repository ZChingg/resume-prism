"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";
import { setLogin } from "@/lib/features/userSlice";

export default function LoginPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch(); // 使用在 redux 定義的 function

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(
        setLogin({ name: user.displayName!, email: user.email!, login: true })
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="hover:bg-gray-100 text-blue-700 py-2 px-4 rounded h-10"
      >
        登入
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
            <h2 className="text-lg font-bold mb-4 text-center">歡迎回來！</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="電子郵件"
                  className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-green-500"
                  value={email}
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
                登入
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              還沒有帳號嗎？
              <a href="#" className="text-green-500 hover:underline">
                {" "}
                註冊
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
