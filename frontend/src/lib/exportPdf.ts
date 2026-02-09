import jsPDF from "jspdf";

interface ActionItem {
  text: string;
  priority: "High" | "Medium" | "Low";
}

interface AnalysisData {
  score: number;
  strengths: string[];
  improvements: string[];
  projects: ActionItem[];
  skills: ActionItem[];
  interview: ActionItem[];
}

export const exportAnalysisToPdf = (data: AnalysisData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Helper functions
  const addTitle = (text: string, size: number = 20) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(99, 102, 241); // Indigo color
    doc.text(text, margin, y);
    y += size * 0.5;
  };

  const addSubtitle = (text: string) => {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128); // Gray color
    doc.text(text, margin, y);
    y += 10;
  };

  const addSectionHeader = (text: string) => {
    y += 5;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 41, 55); // Dark gray
    doc.text(text, margin, y);
    y += 8;
  };

  const addBulletPoint = (text: string, indent: number = 0) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(55, 65, 81);
    
    const bulletX = margin + indent;
    const textX = bulletX + 5;
    const maxWidth = contentWidth - indent - 5;
    
    // Handle text wrapping
    const lines = doc.splitTextToSize(text, maxWidth);
    
    doc.text("•", bulletX, y);
    lines.forEach((line: string, index: number) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, textX, y);
      y += 5;
    });
    y += 2;
  };

  const addPriorityItem = (text: string, priority: string) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    const priorityColors: Record<string, [number, number, number]> = {
      High: [239, 68, 68],    // Red
      Medium: [245, 158, 11], // Amber
      Low: [34, 197, 94],     // Green
    };
    
    const bulletX = margin + 5;
    const textX = bulletX + 5;
    const maxWidth = contentWidth - 50;
    
    // Priority badge
    const [r, g, b] = priorityColors[priority] || priorityColors.medium;
    doc.setTextColor(r, g, b);
    doc.setFont("helvetica", "bold");
    doc.text(`[${priority.toUpperCase()}]`, margin, y);
    
    // Item text
    doc.setTextColor(55, 65, 81);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, maxWidth);
    
    lines.forEach((line: string, index: number) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin + 25, y);
      y += 5;
    });
    y += 2;
  };

  const checkPageBreak = (requiredSpace: number = 30) => {
    if (y > 270 - requiredSpace) {
      doc.addPage();
      y = 20;
    }
  };

  // Header
  addTitle("GenAI Career Copilot", 24);
  y += 2;
  addSubtitle("Career Analysis Report");
  addSubtitle(`Generated on ${new Date().toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  })}`);
  
  // Divider line
  y += 5;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Career Readiness Score
  addSectionHeader("Career Readiness Score");
  
  // Score circle representation
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  
  // Color based on score
  if (data.score >= 80) {
    doc.setTextColor(34, 197, 94); // Green
  } else if (data.score >= 60) {
    doc.setTextColor(99, 102, 241); // Indigo
  } else {
    doc.setTextColor(245, 158, 11); // Amber
  }
  
  doc.text(`${data.score}%`, margin, y + 5);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text("Based on your current profile and role expectations", margin + 30, y + 2);
  y += 20;

  // Strengths
  checkPageBreak(40);
  addSectionHeader("✨ Strengths");
  data.strengths.forEach((item) => {
    checkPageBreak();
    addBulletPoint(item);
  });

  // Areas to Improve
  checkPageBreak(40);
  addSectionHeader("🎯 Areas to Improve");
  data.improvements.forEach((item) => {
    checkPageBreak();
    addBulletPoint(item);
  });

  // Projects to Build
  checkPageBreak(40);
  addSectionHeader("💻 Projects to Build");
  data.projects.forEach((item) => {
    checkPageBreak();
    addPriorityItem(item.text, item.priority);
  });

  // Skills to Strengthen
  checkPageBreak(40);
  addSectionHeader("📚 Skills to Strengthen");
  data.skills.forEach((item) => {
    checkPageBreak();
    addPriorityItem(item.text, item.priority);
  });

  // Interview Prep
  checkPageBreak(40);
  addSectionHeader("💬 Interview Preparation");
  data.interview.forEach((item) => {
    checkPageBreak();
    addPriorityItem(item.text, item.priority);
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(
      `Page ${i} of ${pageCount} • GenAI Career Copilot`,
      pageWidth / 2,
      285,
      { align: "center" }
    );
  }

  // Save the PDF
  doc.save("career-analysis-report.pdf");
};
