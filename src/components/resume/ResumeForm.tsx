"use client";

import { useState, useEffect } from "react";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillSection from "./SkillSection";

interface ResumeFormProps {
  onChange: (data: any) => void;
  initialData?: any; // 可選的 initialData，以編輯舊履歷
}

const initialExperience = {
  position: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
};

const initialEducation = {
  school: "",
  major: "",
  degree: "",
  startDate: "",
  endDate: "",
  description: "",
};

const initialSkill = {
  name: "",
  level: "",
  description: "",
};

export default function ResumeForm({ onChange, initialData }: ResumeFormProps) {
  // 解構賦值來取用 Props 中資料: setResume(data)
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    email: "",
    phone: "",
    website: "",
    websiteLink: "",
    profile: "",
    experience: [initialExperience], // 若初始無資料就刪除 // 陣列中裝好幾筆工作資料
    education: [initialEducation],
    skill: [initialSkill],
  });

  // 在組件初始化時檢查是否有 initialData
  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // 如果有 initialData，使用它來初始化表單
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // 包含舊的 formdata 與更新資料
    onChange({ ...formData, [name]: value }); // 將更新後的數據回傳給父元素
  };

  // 控制收合表單
  // 增加區塊
  const handleAddSection = (
    key: "experience" | "education" | "skill",
    initialData: any
  ) => {
    setFormData({
      ...formData,
      [key]: [...formData[key], initialData],
    });
  };

  // 修改區塊
  const handleChangeSection = (
    key: "experience" | "education" | "skill",
    index: number,
    updatedData: any
  ) => {
    const updatedDatas = formData[key].map((data, i) =>
      i === index ? updatedData : data
    );
    setFormData({ ...formData, [key]: updatedDatas });
    onChange({ ...formData, [key]: updatedDatas });
  };

  // 刪除區塊
  const handleDeleteSection = (
    key: "experience" | "education" | "skill",
    index: number
  ) => {
    const updatedDatas = formData[key].filter((_, i) => i !== index);
    setFormData({ ...formData, [key]: updatedDatas });
    onChange({ ...formData, [key]: updatedDatas });
  };

  return (
    <form>
      <label>
        姓名
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input-resume"
        />
      </label>
      <label>
        生日
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="input-resume"
        />
      </label>
      <div className="flex space-x-6">
        <label className="flex-1">
          電話
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-resume"
          />
        </label>
        <label className="flex-1">
          聯絡信箱
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-resume"
          />
        </label>
      </div>
      <div className="flex space-x-6">
        <label className="flex-1">
          個人網站
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="input-resume"
          />
        </label>
        <label className="flex-1">
          個人網站連結
          <input
            type="text"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleChange}
            className="input-resume"
          />
        </label>
      </div>
      <label>
        <h2 className="title">簡歷</h2>
        <textarea
          name="profile"
          value={formData.profile}
          onChange={handleChange}
          className="input-resume mt-0"
          placeholder="簡潔帶到你的「人格特質」、「職務背景與重要能力」、「職涯目標」等"
          rows={4}
        />
      </label>
      <div className="mb-6">
        <h2 className="title">工作經驗</h2>
        {formData.experience.map(
          (
            data,
            index // callback 可回傳元素+位置
          ) => (
            <ExperienceSection // 將每個工作經驗渲染為組件
              key={index} // 陣列裡每一個元素都要有 key 屬性
              experience={data}
              onChange={(updatedExperience) =>
                handleChangeSection("experience", index, updatedExperience)
              }
              onDelete={() => handleDeleteSection("experience", index)} // 若沒加上箭頭函式會在渲染時立即執行而非點擊刪除時
            />
          )
        )}
        <button
          type="button" // 若不指定 button，預設會 submit
          onClick={() => handleAddSection("experience", initialExperience)}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          + 工作經驗
        </button>
      </div>
      <div className="mb-6">
        <h2 className="title">學歷</h2>
        {formData.education.map(
          (
            data,
            index // callback 可回傳元素+位置
          ) => (
            <EducationSection // 將每個工作經驗渲染為組件
              key={index} // 陣列裡每一個元素都要有 key 屬性
              education={data}
              onChange={(updatedEducation) =>
                handleChangeSection("education", index, updatedEducation)
              }
              onDelete={() => handleDeleteSection("education", index)}
            />
          )
        )}
        <button
          type="button" // 若不指定 button，預設會 submit
          onClick={() => handleAddSection("education", initialEducation)}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          + 學歷
        </button>
      </div>
      <div className="mb-6">
        <h2 className="title">專業技能</h2>
        {formData.skill.map(
          (
            data,
            index // callback 可回傳元素+位置
          ) => (
            <SkillSection // 將每個工作經驗渲染為組件
              key={index} // 陣列裡每一個元素都要有 key 屬性
              skill={data}
              onChange={(updatedSkill) =>
                handleChangeSection("skill", index, updatedSkill)
              }
              onDelete={() => handleDeleteSection("skill", index)}
            />
          )
        )}
        <button
          type="button" // 若不指定 button，預設會 submit
          onClick={() => handleAddSection("skill", initialSkill)}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          + 專業技能
        </button>
      </div>
    </form>
  );
}
