import React, { useState, useRef } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import LeftPanel from "../Components/LeftPanel";
import RightPanel from "../Components/RightPanel";
import PDFPreviewPage from "../Components/PDFPreviewPage";
import { createComponent } from "../Utils/ComponentFactory";
import { exportToPDF } from "../Utils/exportToPDF"

export default function TripPlanner() {
  const pdfRef = useRef();
  const [canvasItems, setCanvasItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveItem({
      type: active.id,
      data: active.data?.current || null,
    });
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over?.id === "canvas") {
      const newItem = createComponent(active.id, active.data?.current);
      if (newItem) {
        setCanvasItems((prev) => [...prev, newItem]);
      }
    }
    setActiveItem(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex h-screen w-screen overflow-hidden"
        style={{
          background: "linear-gradient(to bottom right, #eef2ff, #ffffff, #f3e8ff)", // Tailwind's indigo-50, white, purple-100 equivalent
        }}
      >
        {/* Left Library Panel */}
        <LeftPanel />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div
            className="p-5 border-b shadow-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)", // replaces bg-white/70
              backdropFilter: "blur(8px)", // replaces backdrop-blur-md
              borderColor: "#d1d5db", // border-gray-300
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h1
                  className="text-3xl font-extrabold"
                  style={{ color: "#1f2937" }} // text-gray-800
                >
                  Route Your Travel
                </h1>
                <p
                  className="text-sm tracking-wide"
                  style={{ color: "#4b5563" }} // text-gray-600
                >
                  JOURNEY SIMPLIFIED
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPreview(true)}
                  style={{
                    backgroundColor: "#2563eb", // blue-600
                    color: "#ffffff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  Preview PDF
                </button>
              </div>
            </div>
          </div>

          {/* Preview Page or Editing Canvas */}
          <div
            className="flex-grow overflow-y-auto p-6"
            style={{ backgroundColor: "#ffffff" }} // replace bg-white
          >
            {showPreview ? (
              <PDFPreviewPage
                items={canvasItems}
                setItems={setCanvasItems}
                innerRef={pdfRef}
                onClose={() => setShowPreview(false)}
                previewMode={true}
              />
            ) : (
              <RightPanel
                ref={pdfRef}
                items={canvasItems}
                setItems={setCanvasItems}
                previewMode={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* Drag Preview Overlay */}
      <DragOverlay>
        {activeItem && (
          <div
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4f46e5", // indigo-600
              color: "#ffffff",
              borderRadius: "0.5rem",
              fontWeight: "600",
              fontSize: "1.125rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            {activeItem.type}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
