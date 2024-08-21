import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SkillItems from "./SkillItems";

interface SkillSectionProps {
  skill: any[];
  onChange: (updatedData: any) => void;
}

const initialSkill = {
  name: "",
  level: "",
  description: "",
};

export default function SkillSection({
  skill = [],
  onChange,
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
    <div className="mb-6">
      <h2 className="title">Skills</h2>
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
                      {...provided.dragHandleProps}
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
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        + Skill
      </button>
    </div>
  );
}
