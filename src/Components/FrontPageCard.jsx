// Updated FrontPageCard with SVG icons instead of Lucide
import React, { useRef } from "react";

import CalendarIcon from "/src/assets/icons/calendar.svg";
import UsersIcon from "/src/assets/icons/users.svg";

export default function FrontPageCard({ id, destination, days, nights, adults, image, onUpdate }) {
  const fileRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdate(id, { image: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "794px",
        height: "1123px",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        border: "1px solid #d1d5db",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "130px",
          backgroundColor: "#0e1328",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#ef4444",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#ffffff",
                transform: "rotate(45deg)",
              }}
            ></div>
          </div>
          <div style={{ color: "#ffffff" }}>
            <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Route Your <span style={{ color: "#f87171" }}>Travel</span>
            </div>
            <div style={{ fontSize: "10px", opacity: 0.8, marginTop: "-4px" }}>JOURNEY SIMPLIFIED</div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div
        style={{
          width: "100%",
          height: "794px",
          marginTop: "90px",
          cursor: "pointer",
        }}
        onClick={() => fileRef.current?.click()}
      >
        {image ? (
          <img src={image} alt="Cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(to bottom right, #1e3a8a, #6b21a8)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: "1.25rem", fontWeight: "600" }}>Click to upload</div>
            <div style={{ fontSize: "0.875rem", opacity: 0.7 }}>JPG or PNG only</div>
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleUpload}
        style={{ display: "none" }}
      />

      {/* Info Card */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "1.5rem",
          right: "1.5rem",
          zIndex: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            padding: "2rem",
          }}
        >
          <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>Travel Itinerary For,</div>

          <input
            value={destination}
            onChange={(e) => onUpdate(id, { destination: e.target.value })}
            placeholder="Destination"
            style={{
              width: "100%",
              fontSize: "2.25rem",
              fontWeight: "bold",
              color: "#7e22ce",
              outline: "none",
              backgroundColor: "transparent",
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem", fontSize: "15px", color: "#374151" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img src={CalendarIcon} alt="calendar" width={18} height={18} />
              <input
                type="number"
                value={nights}
                onChange={(e) => onUpdate(id, { nights: e.target.value })}
                placeholder="0"
                min="0"
                style={{ width: "3rem", textAlign: "center", backgroundColor: "transparent", borderBottom: "1px solid #d1d5db", outline: "none" }}
              />
              <span>Nights,</span>
              <input
                type="number"
                value={days}
                onChange={(e) => onUpdate(id, { days: e.target.value })}
                placeholder="0"
                min="0"
                style={{ width: "3rem", textAlign: "center", backgroundColor: "transparent", borderBottom: "1px solid #d1d5db", outline: "none" }}
              />
              <span>Days</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img src={UsersIcon} alt="users" width={18} height={18} />
              <input
                type="number"
                value={adults}
                onChange={(e) => onUpdate(id, { adults: e.target.value })}
                placeholder="0"
                min="1"
                style={{ width: "3rem", textAlign: "center", backgroundColor: "transparent", borderBottom: "1px solid #d1d5db", outline: "none" }}
              />
              <span>Adults</span>
            </div>
          </div>

          <hr style={{ marginTop: "1.5rem", marginBottom: "1.5rem", borderColor: "#e5e7eb" }} />

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
            <div>
              <em>
                Prepared by, Route Your Travel on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
              </em>
              <div style={{ fontSize: "11px", marginTop: "0.25rem", fontStyle: "italic" }}>
                ** Terms and Conditions Apply
              </div>
            </div>
            <div style={{ fontWeight: "500" }}>Version 1.0</div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "280px", backgroundColor: "#0e1328", zIndex: 10 }} />
    </div>
  );
}