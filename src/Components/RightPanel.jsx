import React, { forwardRef, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import FrontPageCard from "./FrontPageCard";
import DayCard from "./DayCard";
import TermsAndConditionsCard from "./TermsAndConditionsCard";
import deleteIcon from "../assets/icons/delete.svg";

const RightPanel = forwardRef(({ items, setItems, previewMode = false }, ref) => {
  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  useEffect(() => {
    if (!previewMode) {
      const hasTerms = items.some((item) => item.type === "Terms");
      if (!hasTerms) {
        setItems((prev) => [...prev, { id: "terms-page", type: "Terms" }]);
      }
    }
  }, [items, setItems, previewMode]);

  const updateItem = (id, changes) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...changes } : item))
    );
  };

  const deleteItem = (id) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.type === "FrontPage" || item.type === "Terms") return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const deleteDayPage = (pageIndex) => {
    const idsToDelete = dayPages[pageIndex].map((i) => i.id);
    setItems((prev) => prev.filter((i) => !idsToDelete.includes(i.id)));
  };

  const addNewDay = () => {
    const newDay = {
      id: Date.now().toString(),
      type: "Day",
      entries: [],
    };
    setItems((prev) => [...prev, newDay]);
  };

  const frontPage = items.find((item) => item.type === "FrontPage");
  const dayItems = items.filter((item) => item.type === "Day");
  const termsPage = items.find((item) => item.type === "Terms");

  const dayPages = [];
  for (let i = 0; i < dayItems.length; i += 2) {
    dayPages.push(dayItems.slice(i, i + 2));
  }

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Front Page */}
      {frontPage && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="pdf-page" style={pageStyle}>
            <FrontPageCard
              {...frontPage}
              onUpdate={updateItem}
              previewMode={previewMode}
            />
          </div>
        </div>
      )}

      {/* Day Pages */}
      {dayPages.map((group, pageIndex) => (
        <div key={pageIndex} style={{ display: "flex", justifyContent: "center" }}>
          <div
            ref={pageIndex === dayPages.length - 1 ? setNodeRef : null}
            className="pdf-page"
            style={{
              ...pageStyle,
              border: `1px solid ${isOver && pageIndex === dayPages.length - 1 ? "#3b82f6" : "#d1d5db"}`,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Page Header */}
            <div style={headerStyle}>
              <div style={pageNumberStyle}>{pageIndex + 1}</div>
              {!previewMode && (
                <button
                  onClick={() => deleteDayPage(pageIndex)}
                  title="Delete this page"
                  style={trashButtonStyle}
                >
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    width={16}
                    height={16}
                  />
                </button>
              )}
            </div>

            {/* Day Cards */}
            <div style={dayCardContainerStyle}>
              {group.map((item, innerIndex) => (
                <div
                  key={item.id}
                  style={{
                    marginBottom: "2.5rem",
                    maxHeight: "1123px",
                    breakInside: "avoid",
                  }}
                >
                  <DayCard
                    {...item}
                    dayNumber={pageIndex * 2 + innerIndex + 1}
                    onUpdate={updateItem}
                    onDelete={deleteItem}
                    previewMode={previewMode}
                  />
                </div>
              ))}

              {!previewMode && pageIndex === dayPages.length - 1 && (
                <div style={{ paddingTop: "1rem" }}>
                  <button onClick={addNewDay} style={addButtonStyle}>
                    + Add New Day
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Empty drop zone */}
      {dayPages.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            ref={setNodeRef}
            className="pdf-page"
            style={{
              ...pageStyle,
              border: `1px solid ${isOver ? "#3b82f6" : "#d1d5db"}`,
              borderRadius: "1.5rem",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
          >
            <div style={emptyDropZoneStyle}>Drag and Drop to plan your Itinerary.</div>
          </div>
        </div>
      )}

      {/* Terms Page */}
      {termsPage && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="pdf-page" style={pageStyle}>
            <TermsAndConditionsCard />
          </div>
        </div>
      )}
    </div>
  );
});

export default RightPanel;

// Style constants
const pageStyle = {
  width: "100%",
  maxWidth: "794px",
  minHeight: "1123px",
  backgroundColor: "#ffffff",
  overflow: "hidden",
  pageBreakAfter: "always",
  breakAfter: "page",
};

const headerStyle = {
  backgroundColor: "#0e1328",
  minHeight: "80px",
  color: "#ffffff",
  padding: "0.75rem 1.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const pageNumberStyle = {
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  fontWeight: "600",
};

const trashButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
};

const addButtonStyle = {
  fontSize: "0.875rem",
  color: "#2563eb",
  background: "none",
  border: "none",
  textDecoration: "underline",
  cursor: "pointer",
};

const dayCardContainerStyle = {
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const emptyDropZoneStyle = {
  padding: "2rem",
  textAlign: "center",
  fontStyle: "italic",
  color: "#9ca3af",
};
