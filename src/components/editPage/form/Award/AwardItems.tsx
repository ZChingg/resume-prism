import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { Award } from "@/components/types";
import QuillEditor from "@/utils/QuillEditor";

interface AwardSectionProps {
  award: Award;
  onChange: (updatedAward: Award) => void;
  onDelete: () => void;
  isDragging: boolean;
  dragHandleProps: any;
}

export default function AwardItems({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  award,
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: AwardSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 偵測使用者是否點擊開合
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...award, [name]: value });
  };

  // 處理富文本編輯器更改
  const handleDescriptionChange = (value: string) => {
    onChange({ ...award, description: value });
  };

  // 判斷所有欄位是否為空
  const isEmpty = !award.name && !award.date;

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
              <h3 className="text-lg font-semibold">{award.name}</h3>
            </>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-400 text-sm">{award.date}</p>
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </div>
      {isExpanded && (
        <>
          <hr className="mx-4" />
          <div className="p-4">
            <div className="flex space-x-4">
              <label className="flex-1">
                Award
                <input
                  type="text"
                  name="name"
                  value={award.name}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                Awarded
                <input
                  type="month"
                  name="date"
                  value={award.date}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
            </div>
            <div>
              <p className="mb-1">Description</p>
              <QuillEditor
                value={award.description}
                onChange={handleDescriptionChange}
                placeholder="Describe any awards or recognitions received and their significance"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
