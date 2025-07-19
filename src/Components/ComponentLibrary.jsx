import { useDraggable } from "@dnd-kit/core";
import fileIcon from "../assets/icons/files.svg";
import calendarIcon from "../assets/icons/calendar.svg";

export default function ComponentLibrary() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
      <DraggableComponent
        type="FrontPage"
        icon={fileIcon}
        desc="Trip Cover Page"
      />
      <DraggableComponent
        type="Day"
        icon={calendarIcon}
        desc="Itinerary Day"
      />
    </div>
  );
}

function DraggableComponent({ type, icon, desc }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: type });

  const handleMouseEnter = (e) => {
    e.currentTarget.style.border = "1px solid #6366f1"; // indigo-500
    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.border = "1px solid #e5e7eb"; // gray-200
    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid #e5e7eb",
        cursor: "grab",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          backgroundColor: "#e0e7ff", // indigo-100
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={icon} alt={type} width={20} height={20} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: 600, fontSize: "14px", color: "#1f2937" }}>{type}</span>
        <span style={{ fontSize: "12px", color: "#6b7280" }}>{desc}</span>
      </div>
    </div>
  );
}
