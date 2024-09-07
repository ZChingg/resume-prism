import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LanguageItems from "./LanguageItems";
import { RiDraggable } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { Language } from "@/components/types";

interface LanguageSectionProps {
  language: Language[];
  onChange: (updatedData: any) => void;
  onDelete: () => void; // 新增的 onDelete 回调
  isDragging: boolean;
  dragHandleProps: any;
}

const initialLanguage = {
  name: "",
  level: "",
};

export default function LanguageSection({
  language = [],
  onChange,
  onDelete,
  isDragging,
  dragHandleProps,
}: LanguageSectionProps) {
  // 增加細項
  const handleAddItem = (initialData: any) => {
    const newLanguage = [...language, initialData];
    onChange(newLanguage);
  };

  // 修改細項
  const handleChangeItem = (index: number, updatedData: any) => {
    const updatedLanguage = language.map((data, i) =>
      i === index ? updatedData : data
    );
    onChange(updatedLanguage);
  };

  // 刪除細項
  const handleDeleteItem = (index: number) => {
    const updatedLanguage = language.filter((_, i) => i !== index);
    onChange(updatedLanguage);
  };

  // 拖曳功能
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const newLanguage = Array.from(language);
    const [reorderedItem] = newLanguage.splice(source.index, 1);
    newLanguage.splice(destination.index, 0, reorderedItem);

    onChange(newLanguage);
  };

  return (
    <div className="px-7 relative">
      <div className="group">
        <h2 className="title">Languages</h2>
        <div
          className="absolute top-0 left-[2px] text-white group-hover:text-gray-400 hover:text-gray-400"
          {...dragHandleProps}
        >
          <RiDraggable
            className={`h-7 w-7 p-1 ${isDragging ? "text-gray-400" : ""}`}
          />
        </div>
        <div className="absolute top-[5px] left-[135px] text-gray-400 hover:text-gray-800 opacity-0 cursor-pointer group-hover:opacity-100">
          <FaTrashAlt
            onClick={onDelete}
            className={`${isDragging ? "opacity-100" : ""}`}
          />
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="languageItems">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {language.map((data, index) => (
                <Draggable
                  key={`language-${index}`}
                  draggableId={`language-${index}`}
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
                      <LanguageItems
                        language={data}
                        onChange={(updatedLanguage) =>
                          handleChangeItem(index, updatedLanguage)
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
        onClick={() => handleAddItem(initialLanguage)}
        className="text-indigo-500 font-semibold hover:bg-indigo-50 w-full text-start px-5 py-1.5 rounded text-sm"
      >
        + Language
      </button>
    </div>
  );
}
