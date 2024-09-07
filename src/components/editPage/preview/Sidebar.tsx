import { useState, useEffect } from "react";
import Image from "next/image";
import { ResumeData } from "@/components/types";
import { BsCheck } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

interface SidebarProps {
  onChange: (templateId: string) => void;
  onColorChange: (color: string) => void;
  data: ResumeData;
  isOpen: boolean;
}

export default function Sidebar({
  onChange,
  onColorChange,
  data,
  isOpen,
}: SidebarProps) {
  const templates = ["template1", "template2"];
  const colors = ["#303030", "#7E918F", "#837A74", "#7B7F82", "#B7A39D"];

  const [selectedColor, setSelectedColor] = useState<string | undefined>("");

  useEffect(() => {
    setSelectedColor(data.selectedColor);
  }, [data.selectedColor]);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <div
      style={{ backgroundColor: "#dbe0eb" }}
      className={`fixed right-0 top-16 bottom-0 z-10 shadow-lg transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0 w-48" : "translate-x-full w-0"
      }`}
    >
      {isOpen && (
        <div className="pt-0 p-5 overflow-y-auto h-full">
          <div
            style={{ backgroundColor: "#dbe0eb" }}
            className="grid grid-cols-5 gap-2 p-5 h-16 w-full fixed mx-[-20px]"
          >
            {colors.map((color) => (
              <button
                key={color}
                className="rounded relative hover:shadow group"
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              >
                {selectedColor === color && (
                  <span className="absolute inset-0 flex items-center justify-center text-white">
                    <BsCheck />
                  </span>
                )}
                {selectedColor !== color && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-white
                scale-0 ease-in-out duration-200 group-hover:scale-100"
                  >
                    <GoDotFill />
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-16">
            {templates.map((template) => (
              <div
                key={template}
                onClick={() => onChange(template)}
                className="cursor-pointer mb-4"
              >
                <Image
                  src={`/${template}.png`}
                  alt="template"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded hover:shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
