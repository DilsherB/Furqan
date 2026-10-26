// RELIABLE JSPDF & AUTOTABLE ENGINE (No Syntax/DOM Errors)
async function generatePDFDocument(docTitle, itemsList, filename) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Brand Header
  doc.setFillColor(15, 23, 42); // Navy 900
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("EGORA ENTERPRISES", 14, 15);

  doc.setFontSize(8);
  doc.setTextColor(16, 185, 129); // Emerald 500
  doc.text("PREMIER GLOBAL SOURCING & EXPORT SOLUTIONS", 14, 21);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${currentDate}`, 196, 12, { align: "right" });
  doc.text("Ref: EG-EXP-2026/OFFICIAL", 196, 17, { align: "right" });
  doc.text("info@egoraenterprises.com | KSA & PK Hubs", 196, 22, {
    align: "right",
  });

  // Document Title Banner
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 38, 182, 16, 3, 3, "F");

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(docTitle, 18, 46);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    "Official commercial specification document. All products conform to ISO quality compliance.",
    18,
    51,
  );

  // Prepare AutoTable Data
  const tableHeaders = [
    [
      "Code & HS",
      "Product Name & Details",
      "Grade / Origin",
      "MOQ & Packaging",
      "Certifications",
    ],
  ];
  const tableRows = itemsList.map((item) => [
    `${item.id}\nHS: ${item.hsCode}`,
    `${item.name}\n${item.summary}`,
    `Grade: ${item.grade}\nOrigin: ${item.origin}`,
    `MOQ: ${item.moq}\nPkg: ${item.packaging}`,
    item.certs.join(", "),
  ]);

  doc.autoTable({
    startY: 60,
    head: tableHeaders,
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
      halign: "left",
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [51, 65, 85],
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 28, fontStyle: "bold" },
      1: { cellWidth: 55 },
      2: { cellWidth: 35 },
      3: { cellWidth: 35 },
      4: { cellWidth: 29 },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  // Footer Notice
  const finalY = doc.lastAutoTable.finalY + 10;
  if (finalY < 270) {
    doc.setDrawColor(226, 232, 240);
    doc.line(14, finalY, 196, finalY);

    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(
      "TERMS: All shipments verified under pre-dispatch inspection audits. Certificates of origin and phytosanitary seals provided upon order confirmation.",
      14,
      finalY + 5,
    );
    doc.text(
      "EGORA Enterprises Trade Desk | www.egoraenterprises.com",
      196,
      finalY + 5,
      { align: "right" },
    );
  }

  doc.save(filename);
}

async function downloadCataloguePDF(
  titleName = "Full Corporate 2026 E-Catalogue",
) {
  showToast(
    "Generating PDF Document...",
    "Preparing official specification tables.",
    "loading",
  );

  try {
    let itemsToExport = CATALOGUE_DATA;
    let documentTitle = titleName;

    if (titleName.includes("Textiles")) {
      itemsToExport = CATALOGUE_DATA.filter((i) => i.category === "textile");
    } else if (titleName.includes("Agri")) {
      itemsToExport = CATALOGUE_DATA.filter((i) => i.category === "agri");
    }

    await generatePDFDocument(
      documentTitle,
      itemsToExport,
      `${documentTitle.replace(/\s+/g, "_")}.pdf`,
    );
    showToast(
      "Download Complete!",
      "Your official PDF document has been downloaded.",
      "success",
    );
  } catch (error) {
    console.error("PDF Generation Error:", error);
    showToast(
      "Generation Failed",
      "Could not render PDF document. Please try again.",
      "error",
    );
  }
}

async function downloadSingleItemSpecPDF(itemId) {
  const item = CATALOGUE_DATA.find((i) => i.id === itemId);
  if (!item) return;

  showToast(
    "Generating Spec Sheet...",
    `Building technical sheet for ${item.id}`,
    "loading",
  );

  try {
    await generatePDFDocument(
      `${item.name} Specification Sheet`,
      [item],
      `${item.id}_Technical_Spec.pdf`,
    );
    showToast(
      "Spec Sheet Downloaded!",
      "Technical document ready in your downloads.",
      "success",
    );
  } catch (error) {
    console.error("Spec PDF Error:", error);
    showToast(
      "Generation Failed",
      "Could not create single item PDF.",
      "error",
    );
  }
}

async function downloadCartSpecsPDF() {
  if (cartItems.length === 0) {
    showToast(
      "Cart Empty",
      "Please add items to your Spec Cart first.",
      "error",
    );
    return;
  }

  showToast(
    "Generating Custom Spec Book...",
    "Compiling cart items into PDF document.",
    "loading",
  );

  try {
    await generatePDFDocument(
      "Selected Inquiry Spec Sheet",
      cartItems,
      "EGORA_Enterprises_Spec_Cart.pdf",
    );
    showToast(
      "PDF Export Complete!",
      "Your customized spec cart PDF has been downloaded.",
      "success",
    );
  } catch (error) {
    console.error("Cart PDF Error:", error);
    showToast("Generation Failed", "Could not create PDF spec sheet.", "error");
  }
}
