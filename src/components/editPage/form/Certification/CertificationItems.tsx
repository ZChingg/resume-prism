import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { Certification } from "@/components/types";

interface CertificationSectionProps {
  certification: Certification;
  onChange: (updatedCertification: Certification) => void;
  onDelete: () => void;
  isDragging: boolean;
  dragHandleProps: any;
}

export default function CertificationItems({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  certification,
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: CertificationSectionProps) {
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
    onChange({ ...certification, [name]: value });
  };

  // 判斷所有欄位是否為空
  const isEmpty = !certification.name && !certification.date;

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
              <h3 className="text-lg font-semibold">{certification.name}</h3>
            </>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-400 text-sm">{certification.date}</p>
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </div>
      {isExpanded && (
        <>
          <hr className="mx-4" />
          <div className="p-4">
            <div className="flex space-x-4">
              <label className="flex-1">
                Certification
                <input
                  type="text"
                  name="name"
                  value={certification.name}
                  onChange={handleChange}
                  className="input-resume mb-0"
                />
              </label>
              <label className="flex-1">
                Issued
                <input
                  type="month"
                  name="date"
                  value={certification.date}
                  onChange={handleChange}
                  className="input-resume mb-0"
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
