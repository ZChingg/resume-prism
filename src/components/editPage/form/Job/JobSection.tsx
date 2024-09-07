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
    <div className="px-7 relative">
      <h2 className="title peer">Job History</h2>
      <div
        className="absolute top-0 left-[2px] text-white peer-hover:text-gray-400 hover:text-gray-400"
        {...dragHandleProps}
      >
        <RiDraggable
          className={`h-7 w-7 p-1 ${isDragging ? "text-gray-400" : ""}`}
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
        className="text-indigo-500 font-semibold hover:bg-indigo-50 w-full text-start px-5 py-1.5 rounded text-sm"
      >
        + Job History
      </button>
    </div>
  );
}
