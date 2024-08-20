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

export default function SkillSection({ skill, onChange }: SkillSectionProps) {

  // 增加細項
  const handleAddSection = (initialData: any) => {
    const newSkill = [...skill, initialData];
    onChange(newSkill);
  };

  // 修改細項
  const handleChangeSection = (index: number, updatedData: any) => {
    const updatedSkill = skill.map((data, i) =>
      i === index ? updatedData : data
    );
    onChange(updatedSkill);
  };

  // 刪除細項
  const handleDeleteSection = (index: number) => {
    const updatedSkill = skill.filter((_, i) => i !== index);
    onChange(updatedSkill);
  };

  return (
    <div className="mb-6">
      <h2 className="title">Skills</h2>
      {skill.map((data, index) => (
        <SkillItems
          key={index}
          skill={data}
          onChange={(updatedSkill) =>
            handleChangeSection(index, updatedSkill)
          }
          onDelete={() => handleDeleteSection(index)}
        />
      ))}
      <button
        type="button"
        onClick={() => handleAddSection({
          name: "",
          level: "",
          description: "",
        })}
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        + Skill
      </button>
    </div>
  );
}
