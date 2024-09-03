// TODO: onAuthStateChanged 位置，是否初載入即需偵測登入狀態

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AuthListener from "@/utils/authListner";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

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
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
