import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (input: HTMLDivElement | null) => {
  if (!input) return null;

  await document.fonts.ready;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
    compress: false,
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();

  // 使用 html2canvas 生成 Canvas
  const canvas = await html2canvas(input, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
    logging: true,
  });

  // 生成圖片
  const imgData = canvas.toDataURL("image/png");
  const imgProps = pdf.getImageProperties(imgData);
  const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // 添加圖片至 PDF
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

  return { pdf, imgData };
};