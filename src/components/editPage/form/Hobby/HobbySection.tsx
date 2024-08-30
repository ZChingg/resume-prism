import { RiDraggable } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import QuillEditor from "@/utils/QuillEditor";

interface HobbySectionProps {
  hobby: string[] | string;
  onChange: (updatedData: any) => void;
  onDelete: () => void; // 新增的 onDelete 回调
  isDragging: boolean;
  dragHandleProps: any;
}

export default function HobbySection({
  hobby,
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: HobbySectionProps) {
  const modules = { toolbar: false };

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="px-7 py-3 relative">
      <div className="group">
        <h2 className="title">Hobbies</h2>
        <div
          className="absolute top-3 left-[2px] text-white group-hover:text-gray-800 hover:text-gray-800"
          {...dragHandleProps}
        >
          <RiDraggable
            className={`h-7 w-7 p-1 ${isDragging ? "text-gray-800" : ""}`}
          />
        </div>
        <div className="absolute top-[18px] left-[155px] text-white cursor-pointer group-hover:text-gray-800 hover:text-gray-800">
          <FaTrashAlt
            onClick={onDelete}
            className={`${isDragging ? "text-gray-800" : ""}`}
          />
        </div>
      </div>
      <div className="hobby-quill">
        <QuillEditor
          value={hobby || ""}
          onChange={handleChange}
          placeholder="What do you like"
          modules={modules}
        />
      </div>
    </div>
  );
}
