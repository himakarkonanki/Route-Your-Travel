import React from "react";
import ComponentLibrary from "./ComponentLibrary";
import starIcon from "../assets/icons/stars.svg";

export default function LeftPanel() {
  return (
    <div
      style={{
        width: "20rem",
        minWidth: "20rem",
        height: "100%",
        background: "linear-gradient(to bottom, #bae6fd, #e0e7ff, #e9d5ff)", // sky-200 to indigo-100 to purple-200
        color: "#1f2937",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflowY: "auto",
        position: "relative",
        animation: "slide-in 0.3s ease-out",
      }}
    >
      {/* Optional background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: "url('/bg-pattern.svg')",
          backgroundRepeat: "repeat",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={starIcon}
              alt="Library Icon"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              Library
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#374151",
                margin: 0,
              }}
            >
              Drag to Create Your Itinerary
            </p>
          </div>
        </div>
      </div>

      {/* Component List */}
      <div style={{ padding: "1rem", zIndex: 10, position: "relative" }}>
        <ComponentLibrary />
      </div>
    </div>
  );
}
