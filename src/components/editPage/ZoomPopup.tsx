import { IoCloseCircle } from "react-icons/io5";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import { ResumeData } from "@/components/types";

interface ZoomPopupProps {
  data: ResumeData;
  onClose: () => void;
}

export default function ZoomPopup({ data, onClose }: ZoomPopupProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex z-50 overflow-auto"
      onClick={onClose}
    >
      <button onClick={onClose}>
        <IoCloseCircle className="absolute right-5 top-5 h-9 w-9 text-gray-200 hover:text-gray-300 cursor-pointer" />
      </button>
      <div className="realtive mt-16 mx-auto w-[833px]">
        <div
          style={{
            width: "595px",
            transform: "scale(1.4)",
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
