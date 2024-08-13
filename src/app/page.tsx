"use client";

import SignupPopup from "@/components/SignupPopup";
import LoginPopup from "@/components/LoginPopup";
import DashBoard from "@/components/DashBoard";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const state = useAppSelector((state) => state.user); // 取得在 redux 定義的 state
  console.log(state);

  return (
    <>
      <div className="navigation">
        {state.profile.login ? (
          <DashBoard />
        ) : (
          <>
            <LoginPopup />
            <SignupPopup />
          </>
        )}
      </div>
    </>
  );
}
