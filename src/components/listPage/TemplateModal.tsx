import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplateModalProps) {
  const templates = [
    { id: "template1", name: "Stockholm" },
    { id: "template2", name: "Oslo" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center z-50"
      style={{ backgroundColor: "#FAFBFD" }}
    >
      <button onClick={onClose}>
        <IoCloseCircle
          className="absolute right-5 top-5 h-9 w-9
         text-gray-600 hover:text-gray-500 active:text-gray-700 cursor-pointer"
        />
      </button>
      <div className="pt-20 p-10 flex flex-col items-center xl:w-[1200px]">
        <h2 className="text-2xl mb-4 text-center font-bold">
          Build Your Resume in Minutes
        </h2>
        <p className="mb-10 text-center text-gray-800 text-sm">
          The selected resume template will automatically update with your real
          profile details, including the language set in your profile. Please
          ensure your profile information is complete and accurate to see the
          resume in your preferred language.
        </p>
        <div className="grid grid-cols-2 gap-6" style={{ maxWidth: "1200px" }}>
          {templates.map((template) => (
            <div key={template.id} className="relative group">
              <div className="p-5 hover:bg-[#e7ecf5] rounded">
                <Image
                  src={`/${template.id}.png`}
                  alt="template"
                  width={300}
                  height={425}
                  className="shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className="purple-button text-sm 
                  opacity-0 group-hover:opacity-100"
                  >
                    Choose Template
                  </button>
                </div>
                <div className="flex justify-center pt-5 pb-1 text-sm">
                  {template.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
