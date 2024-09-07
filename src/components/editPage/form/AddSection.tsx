import { ResumeData } from "@/components/types";
import {
  FaCertificate,
  FaTrophy,
  FaLanguage,
  FaPaintBrush,
} from "react-icons/fa";

interface AddSectionProps {
  data: ResumeData;
  onAddBlock: (section: string) => void;
}

export default function AddSection({ data, onAddBlock }: AddSectionProps) {
  const sections = [
    { key: "certification", label: "Certifications", icon: <FaCertificate /> },
    { key: "award", label: "Awards", icon: <FaTrophy /> },
    { key: "hobby", label: "Hobbies", icon: <FaPaintBrush /> },
    { key: "language", label: "Languages", icon: <FaLanguage /> },
  ];

  return (
    <div className="px-7">
      <h2 className="title">Add Section</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
        {sections.map((section) =>
          data[section.key as keyof ResumeData] ? (
            <div
              key={section.key}
              className="px-3 py-2 text-gray-400 text-center"
            >
              {section.label}
            </div>
          ) : (
            <button
              key={section.key}
              onClick={() => onAddBlock(section.key)}
              className="px-3 py-2 rounded bg-[#EFF2F9] hover:bg-[#f4f5fa] active:bg-[#DDE3F0] hover:text-indigo-500"
            >
              <span>{section.label}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}
