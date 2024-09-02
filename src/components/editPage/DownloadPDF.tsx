import { forwardRef } from "react";
import Template1 from "./preview/templates/Template1";
import Template2 from "./preview/templates/Template2";
import { ResumeData } from "@/components/types";

interface DownloadPDFProps {
  data: ResumeData;
}

const DownloadPDF = forwardRef<HTMLDivElement, DownloadPDFProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
        }}
      >
        {data.selectedTemplate === "template1" && <Template1 data={data} />}
        {data.selectedTemplate === "template2" && <Template2 data={data} />}
      </div>
    );
  }
);

DownloadPDF.displayName = "DownloadPDF";

export default DownloadPDF;
