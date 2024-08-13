// TODO: onAuthStateChanged 位置，是否初載入即需偵測登入狀態

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AuthListener from "@/utils/authListner";

const inter = Inter({ subsets: ["latin"] }); // TODO: 字體配置

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
      <body className={inter.className}>
        <StoreProvider>
          <AuthListener />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
