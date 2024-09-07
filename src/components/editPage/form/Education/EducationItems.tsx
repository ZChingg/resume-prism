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
      <div className="absolute left-[-27px] top-[21px]" {...dragHandleProps}>
        <RiDraggable
          className={`h-7 w-7 p-1 ${
            isDragging ? "text-gray-400" : "text-white"
          } group-hover/item:text-gray-400`}
        />
      </div>
      <button
        onClick={onDelete}
        type="button"
        className="absolute right-[-38px] top-[15px]"
      >
        <FaTrashAlt
          className={`m-3 text-gray-400 hover:text-gray-800 opacity-0${
            isDragging ? "opacity-100" : ""
          } group-hover/item:opacity-100`}
        />
      </button>
      <div
        className="flex px-5 py-4 border-gray-100 cursor-pointer h-[70px] justify-between"
        onClick={handleToggleExpand}
      >
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-3">
            {isEmpty ? (
              <p className="text-gray-400 text-sm">Incomplete</p>
            ) : (
              <>
                <h3 className="font-semibold text-sm">{education.school}</h3>
                <p className="text-xs">{education.major}</p>
              </>
            )}
          </div>
          <p className="text-gray-400 text-xs">
            {education.startDate && <span>{education.startDate}</span>}
            {(education.startDate || education.endDate) && " ~ "}
            {education.endDate && <span>{education.endDate}</span>}
          </p>
        </div>
        <div className="flex items-center space-x-3 text-gray-400">
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </div>
      {isExpanded && (
        <>
          <hr className="mx-4" />
          <div className="p-5">
            <label>
              School Name
              <input
                type="text"
                name="school"
                value={education.school}
                onChange={handleChange}
                className="input-resume"
                placeholder="Enter"
              />
            </label>
            <div className="flex space-x-6">
              <label className="flex-1">
                Depart
                <input
                  type="text"
                  name="major"
                  value={education.major}
                  onChange={handleChange}
                  className="input-resume"
                  placeholder="Enter"
                />
              </label>
              <label className="flex-1">
                Degree
                <select
                  name="degree"
                  value={education.degree}
                  onChange={handleChange}
                  className={`input-resume mb-0 ${
                    education.degree ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="">Select</option>
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
            <div className="flex space-x-6">
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
