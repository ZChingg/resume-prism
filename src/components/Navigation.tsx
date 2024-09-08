"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/Redux/hooks";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import { setLogout } from "@/lib/Redux/features/userSlice";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { IoPrism } from "react-icons/io5";
import { FiArrowLeft } from "react-icons/fi";
import { RiFileDownloadLine } from "react-icons/ri";
import LoadingCircle from "@/components/LoadingCircle";

import SignupPopup from "@/components/SignupPopup";
import LoginPopup from "@/components/LoginPopup";
import toastNotification from "@/components/ToastNotification";

interface NavigationProps {
  handleSave?: () => void;
  exportPDF?: () => void;
  id?: string | string[];
}

export default function Navigation({
  handleSave,
  exportPDF,
  id,
}: NavigationProps) {
  const state = useAppSelector((state) => state.user);
  const user = state.profile;
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSaveClick = async () => {
    if (handleSave) {
      setIsSaving(true);
      await handleSave();
      setIsSaving(false);
    }
  };

  const handleDownloadClick = async () => {
    if (exportPDF) {
      setIsDownloading(true);
      await exportPDF();
      setIsDownloading(false);
    }
  };

  // 控制註冊與登入popup狀態
  const [activePopup, setActivePopup] = useState<"login" | "signup" | null>(
    null
  );
  const togglePopup = (popup: "login" | "signup" | null) => {
    setActivePopup(popup);
  };

  // 登入與註冊成功提示訊息
  const handleClose = (success?: boolean, type?: "login" | "signup") => {
    setActivePopup(null);
    if (success) {
      if (type === "login") {
        toastNotification("success", "Login successful.");
      } else if (type === "signup") {
        toastNotification("success", "Signup successful. Login automatically.");
      }
    }
  };

  // 控制收合會員表單狀態
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // 點擊外部關閉表單
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 若收合表單是開的且點擊了非收合表單的元素，則關閉表單
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    //  若收合表單開/關，則關/開以 handleClickOutside 函數基礎的 mousedown 監聽器
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 登出
  const handleLogout = () => {
    dispatch(setLogout());
    auth.signOut();
    setIsDropdownOpen(false);
  };

  // 不同頁面的 navigation（右側）
  // Home 頁
  const renderButtons = () => {
    if (pathname === "/") {
      if (user.login) {
        return (
          <>
            <Link href="/resume">
              <button className="purple-button">My Resumes</button>
            </Link>
          </>
        );
      } else {
        return (
          <>
            <button
              onClick={() => togglePopup("login")}
              className="white-button text-indigo-700 w-[84.28px]"
            >
              Log In
            </button>
            <button
              onClick={() => togglePopup("signup")}
              className="purple-button ml-3 w-[84.28px]"
            >
              Sign Up
            </button>
          </>
        );
      }
      // 編輯頁
    } else if (pathname === `/resume/${id}/edit`) {
      return (
        <div className="flex items-center mr-3">
          {handleSave && (
            <button
              className="purple-button ml-auto"
              onClick={handleSaveClick}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          )}
          {exportPDF && (
            <button
              className="text-gray-400 hover:text-indigo-500 ml-3"
              onClick={handleDownloadClick}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <LoadingCircle size={21.83} color="gray-400" />
              ) : (
                <>
                  <RiFileDownloadLine className="h-5 w-5" />
                  <p className="font-medium text-xs">PDF</p>
                </>
              )}
            </button>
          )}
        </div>
      );
    }
  };

  // 不同頁面的 navigation（左側）
  const BackToButton = () => {
    // 編輯頁
    if (pathname === `/resume/${id}/edit`) {
      return (
        <Link href="/resume">
          <button className="white-button text-indigo-500 flex items-center mr-1">
            <FiArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
        </Link>
      );
    } else {
      return (
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={500}
            height={500}
            className="w-10 h-10 block md:hidden"
          />
          <Image
            src="/logo-full.png"
            alt="logo"
            width={200}
            height={62.5}
            className="h-[60%] w-[60%] hidden md:block"
          />
        </Link>
      );
    }
  };

  // 會員下拉表
  const userProfile = () => {
    if (user.login) {
      return (
        <div ref={dropdownRef}>
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
                src={user.photoURL}
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full object-cover ml-4"
              />
            )}
            <FaChevronDown className="h-3 w-3" />
          </div>
          {isDropdownOpen && (
            <div className="absolute border border-gray-100 right-0 mt-6 w-60 bg-white rounded-md shadow-lg p-2 z-20">
              <div className="font-bold px-1 pt-2">{user.name}</div>
              <div className="text-gray-400 text-sm px-1 pb-2">
                {user.email}
              </div>
              <hr className="my-2" />
              <Link href="/resume" className="block hover:bg-gray-100 p-2">
                My Resumes
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left hover:bg-gray-100 p-2"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex sticky h-16 border-b border-gray-100	bg-white items-center px-5 *:md:px-10 z-50 top-0 justify-end">
      {/* 左側 */}
      {BackToButton()}
      {/* 右側 */}
      <div className="ml-auto flex relative">
        {renderButtons()}
        {userProfile()}
      </div>
      {activePopup === "login" && (
        <LoginPopup
          onSignupClick={() => togglePopup("signup")}
          onClose={handleClose}
        />
      )}
      {activePopup === "signup" && (
        <SignupPopup
          onLoginClick={() => togglePopup("login")}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
