import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import JobItems from "./JobItems";
import { RiDraggable } from "react-icons/ri";

interface JobSectionProps {
  // FIXME: 看是否需定義不用 any
  job: any[];
  onChange: (updatedData: any) => void;
  isDragging: boolean;
  dragHandleProps: any;
}

const initialJob = {
  position: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function JobSection({
  job = [],
  onChange,
  isDragging,
  dragHandleProps,
}: JobSectionProps) {
  // 增加細項
  const handleAddItem = (initialData: any) => {
    const newJob = [...job, initialData];
    onChange(newJob);
  };

  // 修改細項
  const handleChangeItem = (index: number, updatedData: any) => {
    const updatedJob = job.map((data, i) => (i === index ? updatedData : data));
    onChange(updatedJob);
  };

  // 刪除細項
  const handleDeleteItem = (index: number) => {
    const updatedJob = job.filter((_, i) => i !== index);
    onChange(updatedJob);
  };

  // 拖曳功能
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const newJob = Array.from(job);
    const [reorderedItem] = newJob.splice(source.index, 1);
    newJob.splice(destination.index, 0, reorderedItem);

    onChange(newJob);
  };

  return (
    <div className="px-7 py-3 relative">
      <h2 className="title peer">Job History</h2>
      <div
        className="absolute top-3 left-[2px] text-white peer-hover:text-gray-800 hover:text-gray-800"
        {...dragHandleProps}
      >
        <RiDraggable
          className={`h-7 w-7 p-1 ${isDragging ? "text-gray-800" : ""}`}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="jobItems">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {job.map((data, index) => (
                <Draggable
                  key={`job-${index}`}
                  draggableId={`job-${index}`}
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
                      <JobItems
                        job={data}
                        onChange={(updatedJob) =>
                          handleChangeItem(index, updatedJob)
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
        onClick={() => handleAddItem(initialJob)}
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        + Job History
      </button>
    </div>
  );
}
