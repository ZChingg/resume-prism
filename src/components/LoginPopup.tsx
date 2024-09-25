"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/Redux/hooks";
import { setLogin } from "@/lib/Redux/features/userSlice";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

interface LoginProps {
  onSignupClick: () => void;
  onClose: (success?: boolean, type?: "login" | "signup") => void;
}

export default function LoginPopup({ onSignupClick, onClose }: LoginProps) {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test123");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch(); // 使用在 redux 定義的 function

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
        setLogin({
          name: user.displayName!,
          email: user.email!,
          uid: user.uid,
          photoURL: null,
          login: true,
        })
      );
      onClose(true, "login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("No account found with this email.");
            break;
          case "auth/invalid-credential":
            setErrorMessage("Incorrect email or password.");
            break;
          default:
            setErrorMessage("Login failed, please try again later.");
            break;
        }
      } else {
        setErrorMessage("Login failed, please try again later.");
      }
    }
  };

  // Google 登入
  async function onGoogleSignUp() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          createdAt: Timestamp.now(),
        });
      }
      onClose(true, "login");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Login failed, please try again later.");
        console.error("Error during Google sign up:", error.message);
      } else {
        setErrorMessage("Login failed, please try again later.");
        console.error(
          "An unknown error occurred during Google sign up:",
          error
        );
      }
    }
  }

  return (
    <div
      onClick={() => onClose(false)}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 size-full"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-8 rounded shadow-lg w-[400px] mx-2"
      >
        <IoClose
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 h-7 w-7 p-1 text-gray-600 cursor-pointer white-button"
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
        <h2 className="font-semibold my-6 text-center">
          We are happy to see you back!
        </h2>
        <button
          className="w-full p-2 rounded text-sm text-gray-500 border border-gray-300 flex items-center justify-center relative  hover:bg-gray-50"
          onClick={onGoogleSignUp}
        >
          <FcGoogle className="absolute left-2 h-5 w-5" />
          <p>Log in with Google</p>
        </button>
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={email}
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
            Log In
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={onSignupClick}
            className="text-indigo-500 hover:underline hover:cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
