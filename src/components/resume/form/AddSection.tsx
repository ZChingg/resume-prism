interface AddSectionProps {
  onAddBlock: (
    block:
      | "customSection"
      | "courses"
      | "internships"
      | "hobbies"
      | "languages"
      | "references"
  ) => void;
}

export default function AddSection({ onAddBlock }: AddSectionProps) {
  const sections = [
    { label: "Custom Section", icon: "📦", value: "customSection" },
    { label: "Courses", icon: "📚", value: "courses" },
    { label: "Internships", icon: "💼", value: "internships" },
    { label: "Hobbies", icon: "🎨", value: "hobbies" },
    { label: "Languages", icon: "🌐", value: "languages" },
    { label: "References", icon: "👥", value: "references" },
  ];

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold">Add Section</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {sections.map((section) => (
          <button
            key={section.value}
            onClick={() =>
              onAddBlock(
                section.value as
                  | "customSection"
                  | "courses"
                  | "internships"
                  | "hobbies"
                  | "languages"
                  | "references"
              )
            }
            className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded hover:bg-gray-100"
          >
            <span className="text-2xl">{section.icon}</span>
            <span className="text-sm mt-2">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
