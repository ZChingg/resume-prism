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
          onClick={() => onAddBlock("award")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Awards
        </button>
        <button
          onClick={() => onAddBlock("hobby")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Hobbies
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
