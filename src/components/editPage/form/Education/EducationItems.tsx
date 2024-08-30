import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { Education } from "@/components/types";
import QuillEditor from "@/utils/QuillEditor";

interface EducationSectionProps {
  education: Education;
  onChange: (updatedEducation: Education) => void;
  onDelete: () => void;
  isDragging: boolean;
  dragHandleProps: any;
}

export default function EducationSection({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  education,
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: EducationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 偵測使用者是否點擊開合
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...education, [name]: value });
  };

  // 處理富文本編輯器更改
  const handleDescriptionChange = (value: string) => {
    onChange({ ...education, description: value });
  };

  // 判斷所有欄位是否為空
  const isEmpty =
    !education.school &&
    !education.major &&
    !education.startDate &&
    !education.endDate;

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
              <h3 className="text-lg font-semibold">{education.school}</h3>
              <p className="text-sm">{education.major}</p>
            </>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-400 text-sm">
            {education.startDate && <span>{education.startDate}</span>}
            {(education.startDate || education.endDate) && " ~ "}
            {education.endDate && <span>{education.endDate}</span>}
          </p>
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </div>
      {isExpanded && (
        <>
          <hr className="mx-4" />
          <div className="p-4">
            <label>
              School Name
              <input
                type="text"
                name="school"
                value={education.school}
                onChange={handleChange}
                className="input-resume"
              />
            </label>
            <div className="flex space-x-4">
              <label className="flex-1">
                Depart
                <input
                  type="text"
                  name="major"
                  value={education.major}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                Degree
                <select
                  name="degree"
                  value={education.degree}
                  onChange={handleChange}
                  className="input-resume"
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option>Elementary/Middle School</option>
                  <option>High school/Vocational School</option>
                  <option>Junior College</option>
                  <option>Bachelor</option>
                  <option>Master</option>
                  <option>PhD</option>
                  <option>Incomplete</option>
                </select>
              </label>
            </div>
            <div className="flex space-x-4">
              <label className="flex-1">
                Start
                <input
                  type="month"
                  name="startDate"
                  value={education.startDate}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                End
                <input
                  type="month"
                  name="endDate"
                  value={education.endDate}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
            </div>
            <div>
              <p className="mb-1">Experience</p>
              <QuillEditor
                value={education.description}
                onChange={handleDescriptionChange}
                placeholder="Describe the class you take and what you have achieved"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
