import { forwardRef, useEffect, useRef, useState } from "react";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import { ResumeData } from "@/components/types";
import Sidebar from "@/components/editPage/Sidebar";
import ZoomPopup from "./ZoomPopup";
import { FaSearchPlus } from "react-icons/fa";

interface ResumeTemplateProps {
  data: ResumeData;
  onTemplateChange: (templateId: string) => void;
}

const ResumeTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(
  ({ data, onTemplateChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [buttonLeft, setButtonLeft] = useState(1200);

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

          const buttonLeftPosition = screenWidth / 4 + resumeWidth / 2 + 6;

          setButtonLeft(buttonLeftPosition);
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // 初次渲染時調用一次

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 放大鏡功能開關
    const toggleZoom = () => {
      setIsZoomed(!isZoomed);
    };

    return (
      <div className="w-1/2 relative outline-none">
        <div className="relative h-full overflow-auto overflow-x-hidden bg-gray-500 py-5 px-[60px]">
          <div
            className="mx-auto bg-white shadow-lg rounded overflow-hidden"
            style={{
              width: "595px",
              transform: "scale(1)",
              transformOrigin: "left top",
            }}
            ref={containerRef}
          >
            <div ref={ref}>
              {/* 根據 selectedTemplate 渲染不同模板 */}
              {data.selectedTemplate === "template1" && (
                <Template1 data={data} />
              )}
              {data.selectedTemplate === "template2" && (
                <Template2 data={data} />
              )}
            </div>
          </div>
        </div>
        <Sidebar onChange={onTemplateChange} />
        <button
          className="absolute top-5 bg-white p-2 rounded shadow hover:bg-gray-200 "
          style={{ left: `${buttonLeft}px` }}
          onClick={toggleZoom}
        >
          <FaSearchPlus className="text-gray-600 h-3 w-3" />
        </button>
        {isZoomed && <ZoomPopup data={data} onClose={toggleZoom} />}
      </div>
    );
  }
);

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
