"use client";

import { useState, useEffect } from "react";
import JobSection from "./form/Job/JobSection";
import EducationSection from "./form/Education/EducationSection";
import SkillSection from "./form/Skill/SkillSection";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface ResumeFormProps {
  onChange: (data: any) => void;
  initialData?: any; // 可選的 initialData，以編輯舊履歷
}

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
    job: [],
    education: [],
    skill: [],
    customSection: [],
    courses: [],
    internships: [],
    hobbies: [],
    languages: [],
    references: [],
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

  // 處理區塊
  const handleItemChange = (
    key: "job" | "education" | "skill",
    updatedData: any
  ) => {
    setFormData({ ...formData, [key]: updatedData });
    onChange({ ...formData, [key]: updatedData });
  };

  const handleDragEnd = (event: any) => {
    const { source, destination } = event; // source, destination: 被拖曳的卡片原先, 最終的 DroppableId 與順序
    if (!destination) return;

    // 用 splice 處理拖曳後資料, 組合出新的 items
    const newItems = Array.from(formData.job); // 拷貝新的 items (來自 state)
    const [remove] = newItems.splice(source.index, 1); // 從 source.index 剪下被拖曳的元素
    newItems.splice(destination.index, 0, remove); // 在 destination.index 位置貼上被拖曳的元素
    setFormData({ ...formData, job: newItems }); // 設定新 items
    onChange({ ...formData, job: newItems });
  };

  return (
    <div className="bg-white w-1/2 pt-6 p-16 overflow-y-scroll">
      <form>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-resume"
          />
        </label>
        <label>
          Date of birth
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="input-resume"
            placeholder="YYYY/MM/DD"
          />
        </label>
        <div className="flex space-x-6">
          <label className="flex-1">
            Phone
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-resume"
            />
          </label>
          <label className="flex-1">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-resume"
            />
          </label>
        </div>
        <label>
          <h2 className="title">Professional Summary</h2>
          <textarea
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            className="input-resume mt-0"
            placeholder="Summarize your Personal Traits, Experience, Skills, and Career Goals"
            rows={4}
          />
        </label>
        <JobSection
          job={formData.job}
          onChange={(
            updatedJob // 傳遞由 JobSection 產生的 updatedJob
          ) => handleItemChange("job", updatedJob)}
        />
        <EducationSection
          education={formData.education}
          onChange={(updatedEducation) =>
            handleItemChange("education", updatedEducation)
          }
        />
        <SkillSection
          skill={formData.skill}
          onChange={(updatedSkill) => handleItemChange("skill", updatedSkill)}
        />
      </form>
      {/*
      {addedBlocks.includes("customSection") && <CustomSection />}
      {/* 在表单底部显示 "Add Section" 部分 }
        <AddSection onAddBlock={handleAddBlock} /> */}
    </div>
  );
}
