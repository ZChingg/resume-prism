"use client";

import { useState, useEffect, useCallback } from "react";
import JobSection from "./form/Job/JobSection";
import EducationSection from "./form/Education/EducationSection";
import SkillSection from "./form/Skill/SkillSection";
import PhotoUpload from "./form/PhotoUpload";
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
    photoURL: "",
    sectionOrder: ["education", "job", "skill"],
  });

  // 初始化 sectionOrder 的 state
  const [sectionOrder, setSectionOrder] = useState<
    Array<"education" | "job" | "skill">
  >(["education", "job", "skill"]);

  // 在組件初始化時檢查是否有 initialData
  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // 如果有 initialData，使用它來初始化表單
      if (initialData.sectionOrder) {
        setSectionOrder(initialData.sectionOrder);
      }
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // 包含舊的 formdata 與更新資料
    onChange({ ...formData, [name]: value }); // 將更新後的數據回傳給父元素
  };

  // 處理上傳照片改變
  const handlePhotoUpload = (url: string) => {
    setFormData({ ...formData, photoURL: url });
    onChange({ ...formData, photoURL: url });
  };

  // 處理區塊拖移改變
  const handleItemChange = (
    key: "education" | "job" | "skill",
    updatedData: any
  ) => {
    setFormData({ ...formData, [key]: updatedData });
    onChange({ ...formData, [key]: updatedData });
  };

  // 拖曳效果
  const onDragEnd = (result: any) => {
    const { source, destination } = result; // source, destination: 被拖曳的卡片原先, 最終的 DroppableId 與順序
    if (!destination) return;

    // 用 splice 處理拖曳後資料, 組合出新的 items
    const newSections = Array.from(sectionOrder); // 拷貝新的 items (來自 state)
    const [remove] = newSections.splice(source.index, 1); // 從 source.index 剪下被拖曳的元素
    newSections.splice(destination.index, 0, remove); // 在 destination.index 位置貼上被拖曳的元素

    setSectionOrder(newSections);

    // 更新 formData 中的 sections 顺序
    const updatedFormData = { ...formData }; // 淺拷貝，避免直接修改原始 formData
    newSections.forEach((section) => {
      updatedFormData[section] = formData[section]; // 將原 formData 中每個 section 的數據按新順序重新賦值到 updatedFormData
    });

    setFormData({ ...updatedFormData, sectionOrder: newSections });
    onChange({ ...updatedFormData, sectionOrder: newSections });
  };

  return (
    <div className="bg-white w-1/2 outline-none h-full overflow-auto">
      <form className="pt-6 p-4">
        <div className="px-7">
          <div className="flex space-x-6">
            <label className="flex-1">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-resume"
              />
            </label>
            <PhotoUpload
              photoURL={formData.photoURL}
              onChange={handlePhotoUpload}
            />
          </div>
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
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="resumeSections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sectionOrder.map((section, index) => (
                  <Draggable key={section} draggableId={section} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-white mb-2 ${
                          snapshot.isDragging ? "opacity-60	drop-shadow-lg" : ""
                        }`}
                      >
                        {section === "job" && (
                          <JobSection
                            job={formData.job}
                            onChange={(updatedJob) =>
                              handleItemChange("job", updatedJob)
                            }
                            isDragging={snapshot.isDragging}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                        {section === "education" && (
                          <EducationSection
                            education={formData.education}
                            onChange={(updatedEducation) =>
                              handleItemChange("education", updatedEducation)
                            }
                            isDragging={snapshot.isDragging}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                        {section === "skill" && (
                          <SkillSection
                            skill={formData.skill}
                            onChange={(updatedSkill) =>
                              handleItemChange("skill", updatedSkill)
                            }
                            isDragging={snapshot.isDragging}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </form>
      {/*
      {addedBlocks.includes("customSection") && <CustomSection />}
      {/* 在表单底部显示 "Add Section" 部分 }
        <AddSection onAddBlock={handleAddBlock} /> */}
    </div>
  );
}
