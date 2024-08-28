import { forwardRef } from "react";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";

const ResumeTemplate = forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    switch (data.selectedTemplate) {
      case "template1":
        return <Template1 ref={ref} data={data} />;
      case "template2":
        return <Template2 ref={ref} data={data} />;
      default:
        return <Template1 ref={ref} data={data} />;
    }
  }
);

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
