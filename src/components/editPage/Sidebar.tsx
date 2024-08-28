import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Image from "next/image";

interface SidebarProps {
  onChange: (templateId: string) => void;
}

export default function Sidebar({ onChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const templates = ["template1", "template2"];

  return (
    <div
      className={`fixed right-0 top-16 bottom-0 ${
        isOpen ? "w-60" : "w-0"
      } duration-300 ease-in-out bg-gray-100 shadow-lg`}
    >
      {isOpen && (
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="font-bold mb-2">Select template</h2>
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
        className="absolute left-[-30px] top-20 bg-gray-100 p-2 rounded-l h-12 w-10"
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
