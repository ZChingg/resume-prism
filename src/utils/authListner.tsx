"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setLogin } from "@/lib/features/userSlice";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthListener() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("初始登入判斷完成1");
        dispatch(
          setLogin({
            name: user.displayName!,
            email: user.email!,
            login: true,
          })
        );
        console.log(user.displayName);
        console.log(user.email);
      } else {
        if (window.location.pathname !== "/") {
          router.push("/");
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  return null;
}
