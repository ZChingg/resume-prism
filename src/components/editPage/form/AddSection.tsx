import { ResumeData } from "@/components/types";

interface AddSectionProps {
  data: ResumeData;
  onAddBlock: (section: string) => void;
}

export default function AddSection({ data, onAddBlock }: AddSectionProps) {
  const sections = [
    { key: "certification", label: "Certifications" },
    { key: "award", label: "Awards" },
    { key: "hobby", label: "Hobbies" },
    { key: "language", label: "Languages" },
  ];

  return (
    <div className="px-7 py-3">
      <h2 className="title">Add Section</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {sections.map((section) =>
          data[section.key as keyof ResumeData] ? (
            <div
              key={section.key}
              className="text-gray-600 font-semibold text-center"
            >
              {section.label}
            </div>
          ) : (
            <button
              key={section.key}
              onClick={() => onAddBlock(section.key)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {section.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
