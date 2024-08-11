import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";

interface Education {
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationSectionProps {
  education: Education;
  onChange: (updatedEducation: Education) => void;
  onDelete: () => void;
}

export default function EducationSection({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  education,
  onChange,
  onDelete,
}: EducationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 偵測使用者是否點擊開合
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e: any) => {
    // 原是 e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

    const { name, value } = e.target;
    onChange({ ...education, [name]: value });
  };

  return (
    <div className="border rounded mb-3 hover:border-gray-800">
      <div
        className="flex justify-between items-center p-4 border-gray-100 cursor-pointer"
        onClick={handleToggleExpand}
      >
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold">{education.school}</h3>
          <p>{education.major}</p>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-400">{`${education.startDate} ~ ${education.endDate}`}</p>
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
            <label>
              學校名稱
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
                系所
                <input
                  type="text"
                  name="major"
                  value={education.major}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                學位
                <select
                  name="degree"
                  value={education.degree}
                  onChange={handleChange}
                  className="input-resume"
                >
                  <option>高中職以下</option>
                  <option>高中職</option>
                  <option>專科</option>
                  <option>學士</option>
                  <option>碩士</option>
                  <option>博士</option>
                  <option>肄業</option>
                </select>
              </label>
            </div>
            <div className="flex space-x-4">
              <label className="flex-1">
                入學時間
                <input
                  type="month"
                  name="startDate"
                  value={education.startDate}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                畢業時間
                <input
                  type="month"
                  name="endDate"
                  value={education.endDate}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
            </div>
            <label>
              在校經歷
              <textarea
                name="description"
                value={education.description}
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
