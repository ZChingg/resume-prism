import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { Skill } from "@/components/resume/types";

interface SkillSectionProps {
  skill: Skill;
  onChange: (updatedSkill: Skill) => void;
  onDelete: () => void;
  isDragging: boolean;
  dragHandleProps: any;
}

export default function SkillItems({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  skill,
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: SkillSectionProps) {
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
    onChange({ ...skill, [name]: value });
  };

  // 判斷所有欄位是否為空
  const isEmpty = !skill.name && !skill.level;

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
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <p className="text-sm">{skill.level}</p>
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
                Skill
                <input
                  type="text"
                  name="name"
                  value={skill.name}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                Proficiency
                <select
                  name="level"
                  value={skill.level}
                  onChange={handleChange}
                  className="input-resume"
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </label>
            </div>
            <label>
              Description
              <textarea
                name="description"
                value={skill.description}
                onChange={handleChange}
                className="input-resume mb-0"
                placeholder="Please use the common terminology to describe your experience"
                rows={4}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}
