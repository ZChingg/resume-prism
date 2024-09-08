// TODO: onAuthStateChanged 位置，是否初載入即需偵測登入狀態

import type { Metadata } from "next";
import { poppins } from "./font";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AuthListener from "@/utils/authListner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "ResumePrism",
  description:
    "Create your job winning resume for free, choose between thousands of resume templates. Write your professional resume in 15 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          <AuthListener />
          <ToastContainer />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
