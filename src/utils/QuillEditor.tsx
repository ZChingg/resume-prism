import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  value: string | string[];
  onChange: (value: string) => void;
  placeholder?: string;
  modules?: object;
}

export default function QuillEditor({
  value,
  onChange,
  placeholder,
  modules,
}: QuillEditorProps) {
  const defaultmodules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules || defaultmodules}
      formats={formats}
    />
  );
}
