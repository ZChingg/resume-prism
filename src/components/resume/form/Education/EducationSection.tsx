import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EducationItems from "./EducationItems";
import { RiDraggable } from "react-icons/ri";

interface EducationSectionProps {
  education: any[];
  onChange: (updatedData: any) => void;
  isDragging: boolean;
  dragHandleProps: any;
}

const initialEducation = {
  school: "",
  major: "",
  degree: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function EducationSection({
  education = [],
  onChange,
  isDragging,
  dragHandleProps,
}: EducationSectionProps) {
  // 增加細項
  const handleAddItem = (initialData: any) => {
    const newEducation = [...education, initialData];
    onChange(newEducation);
  };

  // 修改細項
  const handleChangeItem = (index: number, updatedData: any) => {
    const updatedEducation = education.map((data, i) =>
      i === index ? updatedData : data
    );
    onChange(updatedEducation);
  };

  // 刪除細項
  const handleDeleteItem = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    onChange(updatedEducation);
  };

  // 拖曳功能
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const newEducation = Array.from(education);
    const [reorderedItem] = newEducation.splice(source.index, 1);
    newEducation.splice(destination.index, 0, reorderedItem);

    onChange(newEducation);
  };

  return (
    <div className="px-7 py-3 relative">
      <h2 className="title peer">Education</h2>
      <div
        className="absolute top-3 left-[2px] text-white peer-hover:text-gray-800 hover:text-gray-800"
        {...dragHandleProps}
      >
        <RiDraggable
          className={`h-7 w-7 p-1 ${isDragging ? "text-gray-800" : ""}`}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="EducationItems">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {education.map((data, index) => (
                <Draggable
                  key={`education-${index}`}
                  draggableId={`education-${index}`}
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
                      <EducationItems
                        education={data}
                        onChange={(updatedEducation) =>
                          handleChangeItem(index, updatedEducation)
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
        onClick={() => handleAddItem(initialEducation)}
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        + Education
      </button>
    </div>
  );
}
