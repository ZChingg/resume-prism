"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/Redux/hooks";
import { setLogin } from "@/lib/Redux/features/userSlice";
import Image from "next/image";

interface SignupProps {
  onLoginClick: () => void;
  onClose: (success?: boolean, type?: "login" | "signup") => void;
}

export default function SignupPopup({ onLoginClick, onClose }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

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
        setLogin({
          name: user.displayName!,
          email: user.email!,
          uid: user.uid,
          photoURL: null,
          login: true,
        })
      );

      // FireStore 儲存使用者資訊
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: null,
        createdAt: Timestamp.now(),
      });
      onClose(true, "signup");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("This email is already registered.");
            break;
          case "auth/weak-password":
            setErrorMessage("Password should be at least 6 characters long.");
            break;
          default:
            setErrorMessage("Registration failed, please try again later.");
            break;
        }
      } else {
        setErrorMessage("Registration failed, please try again later.");
      }
    }
  };

  return (
    <div
      onClick={() => onClose(false)}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 size-full"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-8 rounded shadow-lg w-[400px]"
      >
        <IoClose
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 h-7 w-7 p-1  text-gray-600 cursor-pointer white-button"
        />
        <div className="flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={500}
            height={500}
            className="h-[15%] w-[15%]"
          />
        </div>
        <h2 className="font-semibold my-6 text-center">Welcome</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-700 text-center text-sm mb-4">
              {errorMessage}
            </p>
          )}
          <button type="submit" className="w-full purple-button">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={onLoginClick}
            className="text-indigo-500 hover:underline hover:cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
