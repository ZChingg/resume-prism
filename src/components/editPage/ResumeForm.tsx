"use client";

import { useState, useEffect, useRef } from "react";
import PhotoUpload from "./form/PhotoUpload";
import EducationSection from "./form/Education/EducationSection";
import JobSection from "./form/Job/JobSection";
import SkillSection from "./form/Skill/SkillSection";
import AddSection from "./form/AddSection"; // 新增的 AddSection 組件
import LanguageSection from "./form/Language/LanguageSection";
import CertificationSection from "./form/Certification/CertificationSection";
import HobbySection from "./form/Hobby/HobbySection";
import AwardSection from "./form/Award/AwardSection";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ResumeData } from "@/components/types";
import QuillEditor from "@/utils/QuillEditor";
import { MdEdit } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import ZoomPopup from "./preview/ZoomPopup";

interface ResumeFormProps {
  onChange: (data: ResumeData) => void;
  initialData?: ResumeData; // 可選的 initialData，以編輯舊履歷
}

export default function ResumeForm({ onChange, initialData }: ResumeFormProps) {
  // 解構賦值來取用 Props 中資料: setResume(data)
  const [formData, setFormData] = useState<ResumeData>({
    resumeName: "",
    name: "",
    birthDate: "",
    email: "",
    phone: "",
    profile: "",
    education: [],
    job: [],
    skill: [],
    photoURL: "",
    sectionOrder: ["education", "job", "skill"],
  });

  const [isZoomed, setIsZoomed] = useState(false);

  // 在組件初始化時檢查是否有 initialData
  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // 如果有 initialData，使用它來初始化表單
      profileRef.current = initialData.profile;
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

  // 處理新增區塊
  const handleAddBlock = (section: string) => {
    const updatedSectionOrder = [...formData.sectionOrder, section];
    const updatedFormData = {
      ...formData,
      [section]: [],
      sectionOrder: updatedSectionOrder,
    };
    setFormData(updatedFormData);
    onChange(updatedFormData);
    console.log(updatedFormData);
  };
  // 處理刪除區塊
  const handleDeleteSection = (section: string) => {
    const updatedFormData = { ...formData };
    delete updatedFormData[section];

    const updatedSectionOrder = formData.sectionOrder.filter(
      (s) => s !== section
    );
    updatedFormData.sectionOrder = updatedSectionOrder;

    setFormData(updatedFormData);
    onChange(updatedFormData);
    console.log(updatedFormData);
  };

  // 處理拖移區塊改變
  const handleItemChange = (
    key:
      | "education"
      | "job"
      | "skill"
      | "language"
      | "certification"
      | "hobby"
      | "award",
    updatedData: any
  ) => {
    setFormData({ ...formData, [key]: updatedData });
    onChange({ ...formData, [key]: updatedData });
  };

  // 拖移效果
  const onDragEnd = (result: any) => {
    const { source, destination } = result; // source, destination: 被拖曳的卡片原先, 最終的 DroppableId 與順序
    if (!destination) return;

    // 用 splice 處理拖曳後資料, 組合出新的 items
    const newSections = Array.from(formData.sectionOrder); // 拷貝新的 items (來自 state)
    const [remove] = newSections.splice(source.index, 1); // 從 source.index 剪下被拖曳的元素
    newSections.splice(destination.index, 0, remove); // 在 destination.index 位置貼上被拖曳的元素

    // 更新 formData 中的 sections 顺序
    setFormData({ ...formData, sectionOrder: newSections });
    onChange({ ...formData, sectionOrder: newSections });
  };

  // 使用 useRef 保存 profile 内容
  const profileRef = useRef<string>("");

  const handleDescriptionChangeT = (value: string) => {
    profileRef.current = value;
    setFormData({ ...formData, profile: value });
    onChange({ ...formData, profile: value });
  };

  // 點擊 icon 全選履歷名字
  const inputRef = useRef<HTMLInputElement>(null);
  const handleIconClick = () => {
    inputRef.current?.select();
  };

  // 放大鏡功能開關
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="bg-white w-full md:w-1/2 outline-none h-full overflow-auto pt-8 pb-16 px-3">
      <div className="m-auto" style={{ maxWidth: "860px" }}>
        <form>
          <div className="px-7 pb-10">
            <div className="flex justify-center mb-6 items-center">
              <input
                type="text"
                name="resumeName"
                value={formData.resumeName}
                ref={inputRef}
                onChange={handleChange}
                className="font-semibold border-b-2 focus:outline-none focus:border-indigo-500 text-center text-lg"
              />
              <MdEdit
                onClick={handleIconClick}
                className="ml-2 cursor-pointer text-gray-400 hover:text-indigo-500"
              />
            </div>
            <div className="flex space-x-6">
              <label className="flex-1">
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-resume"
                  placeholder="Enter"
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
                  placeholder="Enter"
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
                  placeholder="Enter"
                />
              </label>
            </div>
            <div className="mt-4">
              <h2 className="title">Professional Summary</h2>
              <QuillEditor
                value={profileRef.current}
                onChange={handleDescriptionChangeT}
                placeholder="Summarize your Personal Traits, Experience, Skills, and Career Goals"
              />
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="resumeSections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {formData.sectionOrder &&
                    formData.sectionOrder.map((section, index) => (
                      <Draggable
                        key={section}
                        draggableId={section}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-white mb-10 relative ${
                              snapshot.isDragging
                                ? "opacity-60	drop-shadow-lg"
                                : ""
                            }`}
                          >
                            {snapshot.isDragging && (
                              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
                            )}
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
                                  handleItemChange(
                                    "education",
                                    updatedEducation
                                  )
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
                            {section === "language" && (
                              <LanguageSection
                                language={formData.language || []}
                                onChange={(updatedLanguage) =>
                                  handleItemChange("language", updatedLanguage)
                                }
                                onDelete={() => handleDeleteSection("language")}
                                isDragging={snapshot.isDragging}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            )}
                            {section === "certification" && (
                              <CertificationSection
                                certification={formData.certification || []}
                                onChange={(updatedCertification) =>
                                  handleItemChange(
                                    "certification",
                                    updatedCertification
                                  )
                                }
                                onDelete={() =>
                                  handleDeleteSection("certification")
                                }
                                isDragging={snapshot.isDragging}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            )}
                            {section === "hobby" && (
                              <HobbySection
                                hobby={formData.hobby || []}
                                onChange={(updatedHobby) =>
                                  handleItemChange("hobby", updatedHobby)
                                }
                                onDelete={() => handleDeleteSection("hobby")}
                                isDragging={snapshot.isDragging}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            )}
                            {section === "award" && (
                              <AwardSection
                                award={formData.award || []}
                                onChange={(updatedAward) =>
                                  handleItemChange("award", updatedAward)
                                }
                                onDelete={() => handleDeleteSection("award")}
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
        <AddSection data={formData} onAddBlock={handleAddBlock} />
      </div>
      <div
        onClick={toggleZoom}
        className="absolute bottom-5 right-8 flex flex-col items-center cursor-pointer"
      >
        <button className=" bg-indigo-500 p-3 rounded-full">
          <IoDocumentTextSharp className="text-white h-6 w-6" />
        </button>
        <p className="text-indigo-500 text-sm">Preview</p>
      </div>
      {isZoomed && <ZoomPopup data={formData} onClose={toggleZoom} />}
    </div>
  );
}
