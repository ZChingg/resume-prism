import { IoCloseCircle } from "react-icons/io5";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import { ResumeData } from "@/components/types";
import { useState, useEffect } from "react";

interface ZoomPopupProps {
  data: ResumeData;
  onClose: () => void;
}

export default function ZoomPopup({ data, onClose }: ZoomPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    // 設置初始延遲以避免動畫閃爍
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10); // 確保組件已加載後再觸發動畫

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 767) {
        // 如果螢幕寬度小於等於 768px，根據螢幕寬度調整縮放比例
        setScale(screenWidth / 650);
      } else {
        setScale(1.2); // 保持最大縮放比例為 1.25
      }
    };

    // 初始化和螢幕寬度更新時缩放比例
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex z-50 overflow-auto transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <button onClick={onClose}>
        <IoCloseCircle className="absolute right-5 top-5 h-9 w-9 text-gray-200 hover:text-gray-300 cursor-pointer" />
      </button>
      <div
        className="relative mt-16 mx-auto"
        style={{ width: `${595 * scale}px` }}
      >
        <div
          style={{
            width: "595px",
            transform: `scale(${scale})`,
            minHeight: "842px",
            transformOrigin: "left top",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {data.selectedTemplate === "template1" && <Template1 data={data} />}
          {data.selectedTemplate === "template2" && <Template2 data={data} />}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
