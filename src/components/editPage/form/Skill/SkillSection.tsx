import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SkillItems from "./SkillItems";
import { RiDraggable } from "react-icons/ri";

interface SkillSectionProps {
  skill: any[];
  onChange: (updatedData: any) => void;
  isDragging: boolean;
  dragHandleProps: any;
}

const initialSkill = {
  name: "",
  level: "",
  description: "",
};

export default function SkillSection({
  skill = [],
  onChange,
  isDragging,
  dragHandleProps,
}: SkillSectionProps) {
  // 增加細項
  const handleAddItem = (initialData: any) => {
    const newSkill = [...skill, initialData];
    onChange(newSkill);
  };

  // 修改細項
  const handleChangeItem = (index: number, updatedData: any) => {
    const updatedSkill = skill.map((data, i) =>
      i === index ? updatedData : data
    );
    onChange(updatedSkill);
  };

  // 刪除細項
  const handleDeleteItem = (index: number) => {
    const updatedSkill = skill.filter((_, i) => i !== index);
    onChange(updatedSkill);
  };

  // 拖曳功能
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const newSkill = Array.from(skill);
    const [reorderedItem] = newSkill.splice(source.index, 1);
    newSkill.splice(destination.index, 0, reorderedItem);

    onChange(newSkill);
  };

  return (
    <div className="px-7 relative">
      <h2 className="title peer">Skills</h2>
      <div
        className="absolute top-0 left-[2px] text-white peer-hover:text-gray-400 hover:text-gray-400"
        {...dragHandleProps}
      >
        <RiDraggable
          className={`h-7 w-7 p-1 ${isDragging ? "text-gray-400" : ""}`}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="skillItems">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {skill.map((data, index) => (
                <Draggable
                  key={`skill-${index}`}
                  draggableId={`skill-${index}`}
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
                      <SkillItems
                        skill={data}
                        onChange={(updatedSkill) =>
                          handleChangeItem(index, updatedSkill)
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
        onClick={() => handleAddItem(initialSkill)}
        className="text-indigo-500 font-semibold hover:bg-indigo-50 w-full text-start px-5 py-1.5 rounded text-sm"
      >
        + Skill
      </button>
    </div>
  );
}
