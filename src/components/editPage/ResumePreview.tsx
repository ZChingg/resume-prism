import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import Template1 from "./preview/templates/Template1";
import Template2 from "./preview/templates/Template2";
import { ResumeData } from "@/components/types";
import Sidebar from "@/components/editPage/preview/Sidebar";
import ZoomPopup from "./preview/ZoomPopup";
import { FaSearchPlus } from "react-icons/fa";
import { LuLayout } from "react-icons/lu";

interface ResumePreviewProps {
  data: ResumeData;
  onTemplateChange: (change: { templateId?: string; color?: string }) => void;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, onTemplateChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    // 使 ref 可在父组件中使用，使用非空斷言操作符（!）
    useImperativeHandle(ref, () => containerRef.current!);

    // 根據螢幕寬度調整履歷大小
    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          const screenWidth = window.innerWidth; // 當前螢幕寬度
          const maxResumeWidth = 595; // 履歷的最大寬度
          const padding = 120;

          // 根據螢幕寬度動態計算履歷寬度
          let calculatedWidth = screenWidth / 2 - padding;

          // 確保履歷寬度不超過最大寬度 595px
          const resumeWidth = Math.min(calculatedWidth, maxResumeWidth);

          // 計算縮放比例
          const scale = resumeWidth / maxResumeWidth;

          // 設置縮放比例和寬度
          containerRef.current.style.transform = `scale(${scale})`;
          containerRef.current.style.width = `${maxResumeWidth}px`; // 設置最大寬度
          containerRef.current.style.minHeight = "842px"; // 設置最小高度
          containerRef.current.style.height = "auto"; // 保持自動高度

          if (screenWidth <= 768) {
            setSidebarIsOpen(false);
          }
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // 初次渲染時調用一次

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 關閉 sidebar
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          setSidebarIsOpen(false);
        }
      };

      if (sidebarIsOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [sidebarIsOpen]);

    // 放大鏡功能開關
    const toggleZoom = () => {
      setIsZoomed(!isZoomed);
    };

    // 樣式功能關閉
    const sidebarOpen = () => {
      setSidebarIsOpen((prev) => !prev);
    };

    return (
      <div className="w-0 md:w-1/2 relative outline-none">
        <div className="relative h-full overflow-auto overflow-x-hidden bg-gray-500 py-5 px-[60px]">
          <div className="max-w-[595px] mx-auto flex items-center mb-2 space-x-2">
            <button
              className="bg-white p-2 rounded shadow hover:bg-gray-200 "
              onClick={toggleZoom}
            >
              <FaSearchPlus className="text-gray-600 h-3 w-3" />
            </button>
            <button
              className="bg-white p-1 rounded shadow hover:bg-gray-200 h-7 w-7 items-center justify-center flex"
              onMouseDown={sidebarOpen}
            >
              <LuLayout className="text-gray-600 h-4 w-4 " />
            </button>
          </div>
          <div
            className="mx-auto bg-white shadow-lg rounded overflow-hidden"
            style={{
              width: "595px",
              height: "842px",
              transform: "scale(1)",
              transformOrigin: "left top",
            }}
            ref={containerRef} // 使用 containerRef 和 forwardRef
          >
            {/* 根據 selectedTemplate 渲染不同模板 */}
            {data.selectedTemplate === "template1" && <Template1 data={data} />}
            {data.selectedTemplate === "template2" && <Template2 data={data} />}
          </div>
        </div>
        <div ref={sidebarRef}>
          <Sidebar
            onChange={(templateId) => onTemplateChange({ templateId })}
            onColorChange={(color) => onTemplateChange({ color })}
            data={data}
            isOpen={sidebarIsOpen}
          />
        </div>
        {isZoomed && <ZoomPopup data={data} onClose={toggleZoom} />}
      </div>
    );
  }
);

ResumePreview.displayName = "ResumeTemplate";

export default ResumePreview;
