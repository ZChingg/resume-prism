"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import { setLogout } from "@/lib/features/userSlice";
import { FaChevronDown } from "react-icons/fa";
import { IoPrism } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import SignupPopup from "@/components/SignupPopup";
import LoginPopup from "@/components/LoginPopup";

export default function Navigation() {
  const state = useAppSelector((state) => state.user);
  const user = state.profile;
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  if (user.photoURL) {
    const src = user.photoURL;
  } else {
    const src = "";
  }

  // 控制收合表單狀態
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // // 點擊外部關閉表單
  // const dropdownRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     // 若收合表單是開的且點擊了非收合表單的元素，則關閉表單
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsDropdownOpen(false);
  //     }
  //   };
  //   //  若收合表單開/關，則關/開以 handleClickOutside 函數基礎的 mousedown 監聽器
  //   if (isDropdownOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isDropdownOpen]);

  // 登出
  const handleLogout = () => {
    dispatch(setLogout());
    auth.signOut();
  };

  // 不同頁面的 navigation
  // 登入註冊
  const renderButtons = () => {
    if (pathname === "/") {
      if (user.login) {
        return (
          <>
            <Link href="/resume">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded h-10">
                我的履歷
              </button>
            </Link>
          </>
        );
      } else {
        return (
          <>
            <LoginPopup />
            <SignupPopup />
          </>
        );
      }
    }
  };

  // 會員表單
  const userProfile = () => {
    if (user.login) {
      return (
        <>
          <div
            className="cursor-pointer flex items-center space-x-2"
            onClick={handleDropdownToggle}
          >
            {user.photoURL === null ? (
              <>
                <FaUserCircle className="ml-4 w-9 h-9 text-gray-300" />
              </>
            ) : (
              <Image
                src="https://lh3.googleusercontent.com/a/ACg8ocIbmV3HvZAK1qSB8bNNL71ZKi8QtsEyT6srIshBKEJ4DvIe=s96-c"
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full object-cover ml-4"
              />
            )}
            <FaChevronDown className="h-3 w-3" />
          </div>
          {isDropdownOpen && (
            <div className="absolute border border-gray-100 right-0 mt-16 w-60 bg-white rounded-md shadow-lg p-2 z-20">
              <div className="font-bold px-1 pt-2">{user.name}</div>
              <div className="text-gray-400 text-sm px-1 pb-2">
                {user.email}
              </div>
              <hr className="my-2" />
              <Link href="/resume" className="block hover:bg-gray-100 p-2">
                我的履歷
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left hover:bg-gray-100 p-2"
              >
                登出
              </button>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="navigation">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <IoPrism className="h-8 w-8" />
        <span className="text-lg font-bold">ResumePrism</span>
      </Link>{" "}
      <div className="ml-auto flex relative">
        {renderButtons()}
        {userProfile()}
      </div>
    </div>
  );
}
