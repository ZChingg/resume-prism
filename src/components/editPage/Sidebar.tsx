import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Image from "next/image";

interface SidebarProps {
  onChange: (templateId: string) => void;
}

export default function Sidebar({ onChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const templates = ["template1", "template2"];

  return (
    <div
      className={`fixed right-0 top-16 bottom-0 z-10 bg-gray-200 shadow-lg transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0 w-48" : "translate-x-full w-0"
      }`}
    >
      {isOpen && (
        <div className="p-5 overflow-y-auto h-full">
          {templates.map((template) => (
            <div
              key={template}
              onClick={() => onChange(template)}
              className="cursor-pointer py-2"
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
      )}
      <button
        className="absolute left-[-30px] top-16 bg-gray-200 p-2 rounded-l h-12 w-10 z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FaChevronRight className="text-gray-600" />
        ) : (
          <FaChevronLeft className="text-gray-600" />
        )}
      </button>
    </div>
  );
}
