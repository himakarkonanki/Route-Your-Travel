import React from "react";
import RightPanel from "./RightPanel";
import { exportToPDF } from "../Utils/exportToPDF";

export default function PDFPreviewPage({ items, setItems, innerRef, onClose }) {
  const handleExport = async () => {
    await exportToPDF(innerRef); 
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "#ffffff",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #d1d5db",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#111827",
          }}
        >
          PDF Preview
        </h2>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={handleExport}
            style={{
              fontSize: "0.875rem",
              color: "#15803d",
              fontWeight: 500,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Export PDF
          </button>

          <button
            onClick={onClose}
            style={{
              fontSize: "0.875rem",
              color: "#2563eb",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close Preview
          </button>
        </div>
      </div>

      {/* PDF Preview Pages (stacked vertically) */}
      <div
        ref={innerRef}
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem", // spacing between A4 pages
          backgroundColor: "#f9fafb",
        }}
      >
        <RightPanel
          items={items}
          setItems={setItems}
          previewMode={true}
        />
      </div>
    </div>
  );
}

