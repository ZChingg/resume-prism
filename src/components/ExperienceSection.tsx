import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";

interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: Experience;
  onChange: (updatedExperience: Experience) => void;
  onDelete: () => void;
}

export default function ExperienceSection({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  experience,
  onChange,
  onDelete,
}: ExperienceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 偵測使用者是否點擊開合
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...experience, [name]: value });
  };

  return (
    <div className="border rounded mb-3 hover:border-gray-800">
      <div
        className="flex justify-between items-center p-4 border-gray-100 cursor-pointer"
        onClick={handleToggleExpand}
      >
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold">{experience.position}</h3>
          <p>{experience.company}</p>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-400">{`${experience.startDate} ~ ${experience.endDate}`}</p>
          <button onClick={onDelete}>
            <FaTrashAlt />
          </button>
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </div>
      {isExpanded && (
        <>
          <hr className="mx-4" />
          <div className="p-4">
            <div className="flex space-x-4">
              <label className="flex-1">
                職稱
                <input
                  type="text"
                  name="position"
                  value={experience.position}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                公司名稱
                <input
                  type="text"
                  name="company"
                  value={experience.company}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
            </div>
            <div className="flex space-x-4">
              <label className="flex-1">
                開始時間
                <input
                  type="month"
                  name="startDate"
                  value={experience.startDate}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                結束時間
                <input
                  type="month"
                  name="endDate"
                  value={experience.endDate}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
            </div>
            <label>
              內容描述
              <textarea
                name="description"
                value={experience.description}
                onChange={handleChange}
                className="input-resume"
                rows={4}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}
