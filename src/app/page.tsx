"use client";

import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

import SignupPopup from "@/components/SignupPopup";
import LoginPopup from "@/components/LoginPopup";

import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";

export default function Home() {
  const state = useAppSelector((state) => state.user); // 取得在 redux 定義的 state
  console.log(state);

  const [isSignedIn, setIsSignedIn] = useState(false);

  // 監聽登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="navigation">
        <LoginPopup />
        <SignupPopup />
      </div>
    </>
  );
}
