import EducationItems from "./EducationItems";

interface EducationSectionProps {
  education: any[];
  onChange: (updatedData: any) => void;
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
  education,
  onChange,
}: EducationSectionProps) {
  // 增加細項
  const handleAddSection = (initialData: any) => {
    const newEducation = [...education, initialData];
    onChange(newEducation);
  };

  // 修改細項
  const handleChangeSection = (index: number, updatedData: any) => {
    const updatedEducation = education.map((data, i) =>
      i === index ? updatedData : data
    );
    onChange(updatedEducation);
  };

  // 刪除細項
  const handleDeleteSection = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    onChange(updatedEducation);
  };

  return (
    <div className="mb-6">
      <h2 className="title">Education</h2>
      {education.map((data, index) => (
        <EducationItems
          key={index}
          education={data}
          onChange={(updatedEducation) =>
            handleChangeSection(index, updatedEducation)
          }
          onDelete={() => handleDeleteSection(index)}
        />
      ))}
      <button
        type="button"
        onClick={() =>
          handleAddSection({
            school: "",
            major: "",
            degree: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        + Education
      </button>
    </div>
  );
}
