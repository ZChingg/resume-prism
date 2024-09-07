import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CertificationItems from "./CertificationItems";
import { RiDraggable } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { Certification } from "@/components/types";

interface CertificationSectionProps {
  certification: Certification[];
  onChange: (updatedData: any) => void;
  onDelete: () => void; // 新增的 onDelete 回调
  isDragging: boolean;
  dragHandleProps: any;
}

const initialCertification = {
  name: "",
  date: "",
};

export default function CertificationSection({
  certification = [],
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: CertificationSectionProps) {
  // 增加細項
  const handleAddItem = (initialData: any) => {
    const newCertification = [...certification, initialData];
    onChange(newCertification);
  };

  // 修改細項
  const handleChangeItem = (index: number, updatedData: any) => {
    const updatedCertification = certification.map((data, i) =>
      i === index ? updatedData : data
    );
    onChange(updatedCertification);
  };

  // 刪除細項
  const handleDeleteItem = (index: number) => {
    const updatedCertification = certification.filter((_, i) => i !== index);
    onChange(updatedCertification);
  };

  // 拖曳功能
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const newCertification = Array.from(certification);
    const [reorderedItem] = newCertification.splice(source.index, 1);
    newCertification.splice(destination.index, 0, reorderedItem);

    onChange(newCertification);
  };

  return (
    <div className="px-7 relative">
      <div className="group">
        <h2 className="title">Certifications</h2>
        <div
          className="absolute top-0 left-[2px] text-white group-hover:text-gray-400 hover:text-gray-400"
          {...dragHandleProps}
        >
          <RiDraggable
            className={`h-7 w-7 p-1 ${isDragging ? "text-gray-400" : ""}`}
          />
        </div>
        <div className="absolute top-[5px] left-[158px] text-gray-400 hover:text-gray-800 opacity-0 cursor-pointer group-hover:opacity-100">
          <FaTrashAlt
            onClick={onDelete}
            className={`${isDragging ? "opacity-100" : ""}`}
          />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="certificationItems">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {certification.map((data, index) => (
                <Draggable
                  key={`certification-${index}`}
                  draggableId={`certification-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`mb-3 ${
                        snapshot.isDragging
                          ? "opacity-60	drop-shadow-lg"
                          : "opacity-100"
                      }`}
                    >
                      <CertificationItems
                        certification={data}
                        onChange={(updatedCertification) =>
                          handleChangeItem(index, updatedCertification)
                        }
                        onDelete={() => handleDeleteItem(index)}
                        isDragging={snapshot.isDragging}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        type="button"
        onClick={() => handleAddItem(initialCertification)}
        className="text-indigo-500 font-semibold hover:bg-indigo-50 w-full text-start px-5 py-1.5 rounded text-sm"
      >
        + Certification
      </button>
    </div>
  );
}
