"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";
import { setLogin } from "@/lib/features/userSlice";
import { FcGoogle } from "react-icons/fc";

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

      setIsOpen(false);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  // Google 註冊
  async function onGoogleSignUp() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.photoURL);

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
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during Google sign up:", error.message);
      } else {
        // 沒有辦法印出 error.message (unknown)
        console.error(
          "An unknown error occurred during Google sign up:",
          error
        );
      }
    }
  }

  return (
    <>
      <button
        onClick={togglePopup}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded h-10 ml-3"
      >
        Sign Up
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
            <h2 className="text-lg font-bold mb-4 text-center">Welcome</h2>
            <button
              className="w-full p-2 rounded text-sm text-gray-500 border border-gray-300 flex items-center justify-center relative  hover:bg-gray-50"
              onClick={onGoogleSignUp}
            >
              <FcGoogle className="absolute left-2 h-5 w-5" />
              <p>Sign up with Google</p>
            </button>
            <div className="flex items-center my-5">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border:none ring-1 ring-gray-300 rounded focus:outline-none hover:ring-2 hover:ring-gray-300 focus:ring-2 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Already have an account?
              <a href="#" className="text-blue-600 hover:underline">
                {" "}
                Log In
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
