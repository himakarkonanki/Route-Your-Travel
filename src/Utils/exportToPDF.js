// utils/exportToPDF.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportToPDF = async (ref) => {
  if (!ref?.current) return;

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

  const pageNodes = ref.current.querySelectorAll(".pdf-page");

  for (let i = 0; i < pageNodes.length; i++) {
    const node = pageNodes[i];

    // Set fixed width for canvas rendering
    const canvas = await html2canvas(node, {
      scale: 2, // Force higher resolution
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: node.scrollWidth,
      windowHeight: node.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    if (i !== 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  }

  pdf.save("Trip-Itinerary.pdf");
};
