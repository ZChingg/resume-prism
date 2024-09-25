import { useEffect } from "react";
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center z-50 overflow-y-auto"
      style={{ backgroundColor: "#FAFBFD" }}
    >
      <button onClick={onClose} className="z-20">
        <IoCloseCircle
          className="absolute right-5 top-5 h-9 w-9
         text-gray-600 hover:text-gray-500 active:text-gray-700 cursor-pointer"
        />
      </button>
      <div className="absolute z-0 h-full w-full">
        <Image
          src="/templateModal.svg"
          width={500}
          height={500}
          alt="Resume sample"
          className="absolute w-auto h-auto inset-0 m-auto object-center object-contain pb-[16%]"
        ></Image>
      </div>
      <div className="pt-20 p-10 flex flex-col items-center xl:w-[1200px] z-10 h-full">
        <h2 className="text-2xl mb-4 text-center font-bold">
          Build Your Resume in Minutes
        </h2>
        <p className="mb-10 text-center text-gray-800 text-sm">
          Choose your desired template and start crafting your resume. <br />
          Every detail is designed to perfection for a flawless finish.
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
          style={{ maxWidth: "1200px" }}
        >
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
          <div className="h-6 md:h-0"></div>
        </div>
      </div>
    </div>
  );
}
