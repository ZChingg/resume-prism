"use client";

import Navigation from "@/components/Navigation";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const state = useAppSelector((state) => state.user); // 取得在 redux 定義的 state
  console.log(state);

  return (
    <>
      <Navigation />
    </>
  );
}
