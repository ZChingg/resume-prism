import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";

interface Skill {
  name: string;
  level: string;
  description: string;
}

interface SkillSectionProps {
  skill: Skill;
  onChange: (updatedSkill: Skill) => void;
  onDelete: () => void;
}

export default function SkillSection({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  skill,
  onChange,
  onDelete,
}: SkillSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 偵測使用者是否點擊開合
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e: any) => {
    // 原是 e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

    const { name, value } = e.target;
    onChange({ ...skill, [name]: value });
  };

  // 判斷所有欄位是否為空 // FIXME: skill name 無法及時渲染
  const isEmpty = !skill.name && !skill.level;

  return (
    <div className="border rounded mb-3 hover:border-gray-800">
      <div
        className="flex justify-between items-center p-4 border-gray-100 cursor-pointer"
        onClick={handleToggleExpand}
      >
        <div className="flex items-center space-x-3">
          {isEmpty ? (
            <p className="text-gray-400 text-sm">尚未輸入欄位</p>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <p className="text-sm">{skill.level}</p>
            </>
          )}
        </div>
        <div className="flex items-center space-x-3">
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
                名稱
                <input
                  type="text"
                  name="name"
                  value={skill.name}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                熟練度
                <select
                  name="level"
                  value={skill.level}
                  onChange={handleChange}
                  className="input-resume"
                >
                  <option>初階</option>
                  <option>中階</option>
                  <option>精通</option>
                </select>
              </label>
            </div>
            <label>
              內容描述
              <textarea
                name="description"
                value={skill.description}
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
