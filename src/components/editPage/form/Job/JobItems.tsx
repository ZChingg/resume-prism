import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { Job } from "@/components/types";
import QuillEditor from "@/utils/QuillEditor";

interface JobItemsProps {
  job: Job;
  onChange: (updatedJob: Job) => void;
  onDelete: () => void;
  isDragging: boolean;
  dragHandleProps: any;
}

export default function JobItems({
  // 物件的解構賦值是以名字來取用的，故順序不重要
  job,
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: JobItemsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 偵測使用者是否點擊開合
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...job, [name]: value });
  };

  // 處理富文本編輯器更改
  const handleDescriptionChange = (value: string) => {
    onChange({ ...job, description: value });
  };

  // 判斷所有欄位是否為空
  const isEmpty =
    !job.position && !job.company && !job.startDate && !job.endDate;

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
                <h3 className="font-semibold text-sm">{job.position}</h3>
                <p className="text-xs">{job.company}</p>
              </>
            )}
          </div>
          <p className="text-gray-400 text-xs">
            {job.startDate && <span>{job.startDate}</span>}
            {(job.startDate || job.endDate) && " ~ "}
            {job.endDate && <span>{job.endDate}</span>}
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
            <div className="flex space-x-6">
              <label className="flex-1">
                Title
                <input
                  type="text"
                  name="position"
                  value={job.position}
                  onChange={handleChange}
                  className="input-resume"
                  placeholder="Enter"
                />
              </label>
              <label className="flex-1">
                Company Name
                <input
                  type="text"
                  name="company"
                  value={job.company}
                  onChange={handleChange}
                  className="input-resume"
                  placeholder="Enter"
                />
              </label>
            </div>
            <div className="flex space-x-6">
              <label className="flex-1">
                Start
                <input
                  type="month"
                  name="startDate"
                  value={job.startDate}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
              <label className="flex-1">
                End
                <input
                  type="month"
                  name="endDate"
                  value={job.endDate}
                  onChange={handleChange}
                  className="input-resume"
                />
              </label>
            </div>
            <div>
              <p className="mb-1">Description</p>
              <QuillEditor
                value={job.description}
                onChange={handleDescriptionChange}
                placeholder="List relevant experience and quantify primary achievements"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
