interface AddSectionProps {
  onAddBlock: (section: string) => void;
}

export default function AddSection({ onAddBlock }: AddSectionProps) {
  return (
    <div className="px-7 py-3">
      <h2 className="title">Add Section</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={() => onAddBlock("certification")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Certifications
        </button>
        <button
          onClick={() => onAddBlock("extraCurricular")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Extra-curricular Activities
        </button>
        <button
          onClick={() => onAddBlock("hobbies")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Hobbies
        </button>
        <button
          onClick={() => onAddBlock("references")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          References
        </button>
        <button
          onClick={() => onAddBlock("courses")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Courses
        </button>
        <button
          onClick={() => onAddBlock("internships")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Internships
        </button>
        <button
          onClick={() => onAddBlock("language")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Languages
        </button>
      </div>
    </div>
  );
}
