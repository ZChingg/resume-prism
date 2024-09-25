"use client";

import Navigation from "@/components/Navigation";
import { useAppSelector } from "@/lib/Redux/hooks";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  const state = useAppSelector((state) => state.user); // 取得在 redux 定義的 state
  console.log(state);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #fafbfd;
        }
      `}</style>
      <Navigation />
      <section className="relative bg-[#FAFBFD] pt-5">
        <div className="absolute z-0 h-full w-full">
          <Image
            src="/background.svg"
            width={1422}
            height={984}
            alt="Resume sample"
            className="absolute w-full inset-0 object-center object-fill pb-[16%]"
          ></Image>
        </div>
        <div className="relative flex flex-col md:flex-row py-10 px-10 md:px-32 m-auto z-10">
          <div className="flex-1 md:my-40">
            <h1 className="text-5xl font-bold mb-3">
              Build a professional resume for free
            </h1>
            <p className="mb-8 text-xl">
              Create your resume easily with our free builder and professional
              templates
            </p>
            {/*<button className="py-3 px-8 rounded bg-blue-600 hover:bg-blue-700 text-white">
            Create My Resume</button>*/}
          </div>
          <div className="flex items-center xl:items-end justify-end md:ml-14 flex-1 w-full">
            <Image
              src="/resumeSample.png"
              width={800}
              height={727}
              alt="Resume sample"
            ></Image>
          </div>
        </div>
        <div className="relative my-10 md:my-20 px-5 md:px-10 m-auto max-w-[72rem] z-10">
          <h2 className="text-2xl md:text-4xl font-bold m-auto max-w-[30rem] md:max-w-[51.25rem] text-center text-black">
            Create resumes that get noticed simple, easy, fast, free
          </h2>
          <p className="text-sm md:text-base md:font-semibold my-10 text-center">
            Effortless creation with intuitive WYSIWYG builder.
          </p>
          <div className="relative m-auto max-w-[72rem] max-h-[46.5rem]">
            <Image
              src="/editPage.png"
              width={4800}
              height={3100}
              alt="Resume sample"
              className="rounded"
            ></Image>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
