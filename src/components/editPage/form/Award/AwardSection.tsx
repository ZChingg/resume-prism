import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AwardItems from "./AwardItems";
import { RiDraggable } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { Award } from "@/components/types";

interface AwardSectionProps {
  award: Award[];
  onChange: (updatedData: any) => void;
  onDelete: () => void; // 新增的 onDelete 回调
  isDragging: boolean;
  dragHandleProps: any;
}

const initialAward = {
  name: "",
  date: "",
  description: "",
};

export default function AwardSection({
  award = [],
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: AwardSectionProps) {
  // 增加細項
  const handleAddItem = (initialData: any) => {
    const newAward = [...award, initialData];
    onChange(newAward);
  };

  // 修改細項
  const handleChangeItem = (index: number, updatedData: any) => {
    const updatedAward = award.map((data, i) =>
      i === index ? updatedData : data
    );
    onChange(updatedAward);
  };

  // 刪除細項
  const handleDeleteItem = (index: number) => {
    const updatedAward = award.filter((_, i) => i !== index);
    onChange(updatedAward);
  };

  // 拖曳功能
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const newAward = Array.from(award);
    const [reorderedItem] = newAward.splice(source.index, 1);
    newAward.splice(destination.index, 0, reorderedItem);

    onChange(newAward);
  };

  return (
    <div className="px-7 py-3 relative">
      <div className="group">
        <h2 className="title">Awards</h2>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="awardItems">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {award.map((data, index) => (
                <Draggable
                  key={`award-${index}`}
                  draggableId={`award-${index}`}
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
                      <AwardItems
                        award={data}
                        onChange={(updatedAward) =>
                          handleChangeItem(index, updatedAward)
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
        onClick={() => handleAddItem(initialAward)}
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        + Award
      </button>
    </div>
  );
}
