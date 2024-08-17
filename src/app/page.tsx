"use client";

import Navigation from "@/components/Navigation";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

export default function Home() {
  const state = useAppSelector((state) => state.user); // 取得在 redux 定義的 state
  console.log(state);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: rgb(249 250 251);
        }
      `}</style>
      <Navigation />
      <div className="flex flex-1 py-10 px-32 m-auto">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-3 my-40">
            Build a professional resume for free
          </h1>
          <p className="mb-8 text-xl">
            Create your resume easily with our free builder and professional
            templates
          </p>
          {/*<button className="py-3 px-8 rounded bg-blue-600 hover:bg-blue-700 text-white">
            Create My Resume
      </button>*/}
        </div>
        <div
          className="items-end justify-end ml-14 flex-1"
          style={{ width: "100%" }}
        >
          <Image
            src="/resumeSample.png"
            width={800}
            height={727}
            alt="Resume sample"
          ></Image>
        </div>
      </div>
    </>
  );
}
