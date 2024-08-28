import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HobbyItems from "./Hobbytems";
import { RiDraggable } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { Hobby } from "@/components/types";

interface HobbySectionProps {
  hobby: Hobby[];
  onChange: (updatedData: any) => void;
  onDelete: () => void; // 新增的 onDelete 回调
  isDragging: boolean;
  dragHandleProps: any;
}

const initialHobby = {
  name: "",
};

export default function HobbySection({
  hobby = [],
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: HobbySectionProps) {
  // 增加細項
  const handleAddItem = (initialData: any) => {
    const newHobby = [...hobby, initialData];
    onChange(newHobby);
  };

  // 修改細項
  const handleChangeItem = (index: number, updatedData: any) => {
    const updatedHobby = hobby.map((data, i) =>
      i === index ? updatedData : data
    );
    onChange(updatedHobby);
  };

  // 刪除細項
  const handleDeleteItem = (index: number) => {
    const updatedHobby = hobby.filter((_, i) => i !== index);
    onChange(updatedHobby);
  };

  // 拖曳功能
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const newHobby = Array.from(hobby);
    const [reorderedItem] = newHobby.splice(source.index, 1);
    newHobby.splice(destination.index, 0, reorderedItem);

    onChange(newHobby);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="hobbyItems">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {hobby.map((data, index) => (
                <Draggable
                  key={`hobby-${index}`}
                  draggableId={`hobby-${index}`}
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
                      <HobbyItems
                        hobby={data}
                        onChange={(updatedHobby) =>
                          handleChangeItem(index, updatedHobby)
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
        onClick={() => handleAddItem(initialHobby)}
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        + Hobby
      </button>
    </div>
  );
}
