import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { Language } from "@/components/resume/types";

interface LanguageSectionProps {
  language: Language;
  onChange: (updatedLanguage: Language) => void;
  onDelete: () => void;
  isDragging: boolean;
  dragHandleProps: any;
}

export default function LanguageItems({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  language,
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: LanguageSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 偵測使用者是否點擊開合
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    onChange({ ...language, [name]: value });
  };

  // 判斷所有欄位是否為空
  const isEmpty = !language.name && !language.level;

  return (
    <div className="border rounded mb-3 bg-white hover:border-gray-800 relative group/item">
      <div className="absolute left-[-27px] top-[16px]" {...dragHandleProps}>
        <RiDraggable
          className={`h-7 w-7 p-1 ${
            isDragging ? "text-gray-800" : "text-white"
          } group-hover/item:text-gray-800`}
        />
      </div>
      <button onClick={onDelete} className="absolute right-[-38px] top-[10px]">
        <FaTrashAlt
          className={`m-3 ${
            isDragging ? "text-gray-800" : "text-white"
          } group-hover/item:text-gray-800`}
        />
      </button>
      <div
        className="flex justify-between items-center p-4 border-gray-100 cursor-pointer"
        onClick={handleToggleExpand}
      >
        <div className="flex items-center space-x-3">
          {isEmpty ? (
            <p className="text-gray-400 text-sm">Incomplete</p>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{language.name}</h3>
              <p className="text-sm">{language.level}</p>
            </>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </div>
      {isExpanded && (
        <>
          <hr className="mx-4" />
          <div className="p-4">
            <div className="flex space-x-4">
              <label className="flex-1">
                Language
                <input
                  type="text"
                  name="name"
                  value={language.name || ""}
                  onChange={handleChange}
                  className="input-resume mb-0"
                />
              </label>
              <label className="flex-1">
                Proficiency
                <select
                  name="level"
                  value={language.level || ""}
                  onChange={handleChange}
                  className="input-resume mb-0"
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option>Beginner</option>
                  <option>Basic</option>
                  <option>Professional proficiency</option>
                  <option>Proficiency</option>
                  <option>Native Language</option>
                </select>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
