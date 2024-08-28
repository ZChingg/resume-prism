import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { Job } from "@/components/types";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...job, [name]: value });
  };

  // 判斷所有欄位是否為空
  const isEmpty =
    !job.position && !job.company && !job.startDate && !job.endDate;

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
              <h3 className="text-lg font-semibold">{job.position}</h3>
              <p className="text-sm">{job.company}</p>
            </>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-gray-400 text-sm">
            {job.startDate && <span>{job.startDate}</span>}
            {(job.startDate || job.endDate) && " ~ "}
            {job.endDate && <span>{job.endDate}</span>}
          </p>
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </div>
      {isExpanded && (
        <>
          <hr className="mx-4" />
          <div className="p-4">
            <div className="flex space-x-4">
              <label className="flex-1">
                Title
                <input
                  type="text"
                  name="position"
                  value={job.position}
                  onChange={handleChange}
                  className="input-resume"
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
                />
              </label>
            </div>
            <div className="flex space-x-4">
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
            <label>
              Description
              <textarea
                name="description"
                value={job.description}
                onChange={handleChange}
                className="input-resume mb-0"
                placeholder="List relevant experience and quantify primary achievements"
                rows={4}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}
