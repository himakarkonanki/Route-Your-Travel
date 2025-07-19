import React, { useEffect, useRef, useState } from "react";
import flightIcon from "../assets/icons/flight.svg";
import hotelIcon from "../assets/icons/hotel.svg";
import activitiesIcon from "../assets/icons/activities.svg";
import breakfastIcon from "../assets/icons/breakfast.svg";
import carIcon from "../assets/icons/car.svg";
import checkoutIcon from "../assets/icons/checkout.svg";
import removeIcon from "../assets/icons/remove.svg";

const ICON_OPTIONS = {
  PlaneLanding: flightIcon,
  Bed: hotelIcon,
  Landmark: activitiesIcon,
  Meals: breakfastIcon,
  CarFront: carIcon,
  Checkout: checkoutIcon,
};

const SECTION_OPTIONS = [
  { value: "PlaneLanding", label: "Flight", heading: "Arrival at Airport" },
  { value: "Bed", label: "Hotel", heading: "Check-in at Hotel" },
  { value: "Landmark", label: "Activity", heading: "City Tour" },
  { value: "Meals", label: "Meal", heading: "Lunch / Dinner" },
  { value: "CarFront", label: "Car", heading: "Transfer to hotel" },
  { value: "Checkout", label: "Checkout", heading: "Check-out from Hotel" },
];

export default function DayCard({ id, dayNumber = 1, entries = [], onUpdate, onDelete, previewMode = false }) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!entries?.[0]?.sections) {
      const defaultEntry = {
        id: Date.now().toString(),
        title: "",
        sections: [
          { heading: "Arrival at Airport", icon: "PlaneLanding", value: "" },
          { heading: "Transfer to hotel", icon: "Bed", value: "" },
          { heading: "Activities", icon: "Landmark", activities: [] },
          { heading: "Drop to hotel", icon: "Bed", value: "" },
        ],
        tables: [],
      };
      onUpdate(id, { entries: [defaultEntry] });
    }
  }, [entries, id, onUpdate]);

  const entry = entries[0] || { sections: [], tables: [] };

  const updateEntry = (newEntry) => onUpdate(id, { entries: [newEntry] });
  const updateSection = (i, key, val) => {
    const updated = [...entry.sections];
    updated[i][key] = val;
    updateEntry({ ...entry, sections: updated });
  };

  const updateActivity = (si, ai, val) => {
    const updated = [...entry.sections];
    updated[si].activities[ai] = val;
    updateEntry({ ...entry, sections: updated });
  };

  const addActivity = (i) => {
    const updated = [...entry.sections];
    updated[i].activities.push("");
    updateEntry({ ...entry, sections: updated });
  };

  const removeActivity = (si, ai) => {
    const updated = [...entry.sections];
    updated[si].activities.splice(ai, 1);
    updateEntry({ ...entry, sections: updated });
  };

  const addSection = () => {
    updateEntry({
      ...entry,
      sections: [...entry.sections, { heading: "New Section", icon: "PlaneLanding", value: "", activities: [] }],
    });
  };

  const addTable = () => {
    updateEntry({
      ...entry,
      tables: [...entry.tables, { heading: "New Table", columns: ["Column 1", "Column 2"], rows: [["", ""]] }],
    });
  };

  const updateTable = (ti, key, val) => {
    const updated = [...entry.tables];
    updated[ti][key] = val;
    updateEntry({ ...entry, tables: updated });
  };

  const updateCell = (ti, ri, ci, val) => {
    const updated = [...entry.tables];
    updated[ti].rows[ri][ci] = val;
    updateEntry({ ...entry, tables: updated });
  };

  const updateColumnName = (ti, ci, val) => {
    const updated = [...entry.tables];
    updated[ti].columns[ci] = val;
    updateEntry({ ...entry, tables: updated });
  };

  const addRow = (ti) => {
    const updated = [...entry.tables];
    updated[ti].rows.push(new Array(updated[ti].columns.length).fill(""));
    updateEntry({ ...entry, tables: updated });
  };

  const addColumn = (ti) => {
    const updated = [...entry.tables];
    updated[ti].columns.push(`Column ${updated[ti].columns.length + 1}`);
    updated[ti].rows = updated[ti].rows.map((r) => [...r, ""]);
    updateEntry({ ...entry, tables: updated });
  };

  const removeTable = (ti) => {
    const updated = [...entry.tables];
    updated.splice(ti, 1);
    updateEntry({ ...entry, tables: updated });
  };

  return (
    <div style={{ display: "flex", gap: "24px", pageBreakInside: "avoid" }}>
      <div style={{ width: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ backgroundColor: "#db2777", width: "2px", height: "100%" }} />
        <div style={{ zIndex: 10, width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#fff", border: "2px solid #db2777" }} />
      </div>

      <div style={{ flex: 1, fontFamily: "Arial", fontSize: "14px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <div style={{ fontWeight: "bold", fontSize: "16px", textTransform: "uppercase", color: "#db2777" }}>
          Day {dayNumber}
        </div>

        {entry.sections.map((section, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
              <div
                onClick={() => !previewMode && setOpenDropdownIndex(openDropdownIndex === i ? null : i)}
                style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: previewMode ? "default" : "pointer" }}
              >
                <img src={ICON_OPTIONS[section.icon]} alt={section.icon} style={{ width: "16px", height: "16px", display: "block", marginTop: "1px" }} />
              </div>

              {openDropdownIndex === i && !previewMode && (
                <div
                  ref={dropdownRef}
                  style={{ position: "absolute", top: "24px", left: 0, backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px", zIndex: 100, boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)", width: "160px", fontSize: "14px" }}
                >
                  {SECTION_OPTIONS.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        updateSection(i, "icon", opt.value);
                        updateSection(i, "heading", opt.heading);
                        setOpenDropdownIndex(null);
                      }}
                      style={{ padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #eee" }}
                    >
                      <img src={ICON_OPTIONS[opt.value]} alt={opt.label} width={16} height={16} />
                      <span>{opt.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {previewMode ? (
                <div style={{ fontWeight: 600 }}>{section.heading}</div>
              ) : (
                <input
                  value={section.heading}
                  onChange={(e) => updateSection(i, "heading", e.target.value)}
                  style={{ fontWeight: 600, fontSize: "16px", border: "none", borderBottom: "1px solid #ccc", outline: "none", backgroundColor: "transparent", width: "100%", color: "#111827" }}
                />
              )}
            </div>

            {section.icon === "Landmark" ? (
              <div style={{ marginLeft: "28px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {section.activities?.map((act, ai) => (
                  <div key={ai} style={{ display: "flex", gap: "6px" }}>
                    <span>•</span>
                    {previewMode ? (
                      <span>{act}</span>
                    ) : (
                      <input value={act} onChange={(e) => updateActivity(i, ai, e.target.value)} style={{ flex: 1, border: "none", borderBottom: "1px solid #ccc", background: "transparent" }} placeholder="Activity..." />
                    )}
                    {!previewMode && (
                      <button onClick={() => removeActivity(i, ai)} style={{ background: "transparent", border: "none", padding: 0 }}>
                        <img src={removeIcon} alt="Remove" width={12} height={12} />
                      </button>
                    )}
                  </div>
                ))}
                {!previewMode && (
                  <button onClick={() => addActivity(i)} style={{ color: "#2563eb", fontSize: "14px" }}>+ Add activity</button>
                )}
              </div>
            ) : section.heading !== "Drop to hotel" ? (
              previewMode ? (
                <div style={{ marginLeft: "28px", color: "#4b5563" }}>{section.value}</div>
              ) : (
                <input type="text" value={section.value || ""} onChange={(e) => updateSection(i, "value", e.target.value)} style={{ marginLeft: "28px", width: "600px", backgroundColor: "transparent", borderBottom: "1px solid #ccc", outline: "none" }} placeholder="Enter details..." />
              )
            ) : null}
          </div>
        ))}

        {!previewMode && <button onClick={addSection} style={{ fontSize: "14px", color: "#2563eb" }}>+ Add Section</button>}

        {entry.tables?.map((table, tIndex) => (
          <div key={tIndex} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {previewMode ? (
              <div style={{ fontWeight: "bold", fontSize: "16px", color: "#7e22ce" }}>{table.heading}</div>
            ) : (
              <input value={table.heading} onChange={(e) => updateTable(tIndex, "heading", e.target.value)} style={{ fontSize: "16px", fontWeight: "bold", color: "#7e22ce", borderBottom: "1px solid #d1d5db", outline: "none" }} />
            )}

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", border: "1px solid #0e1328" }}>
              <thead>
                <tr style={{ backgroundColor: "#0e1328", color: "#ffffff" }}>
                  {table.columns.map((col, cIndex) => (
                    <th key={cIndex} style={{ padding: "10px", border: "1px solid #0e1328", textAlign: "left" }}>
                      {previewMode ? col : (
                        <input value={col} onChange={(e) => updateColumnName(tIndex, cIndex, e.target.value)} style={{ background: "transparent", color: "#fff", border: "none", width: "100%", outline: "none" }} />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIndex) => (
                  <tr key={rIndex}>
                    {row.map((cell, cIndex) => (
                      <td key={cIndex} style={{ padding: "8px", border: "1px solid #0e1328", backgroundColor: "#ffffff", color: "#000000" }}>
                        {previewMode ? cell : (
                          <input value={cell} onChange={(e) => updateCell(tIndex, rIndex, cIndex, e.target.value)} style={{ background: "transparent", border: "none", outline: "none", width: "100%" }} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {!previewMode && (
              <div style={{ display: "flex", gap: "1rem", marginTop: "4px", fontSize: "14px" }}>
                <button onClick={() => addRow(tIndex)} style={{ color: "#2563eb" }}>+ Add Row</button>
                <button onClick={() => addColumn(tIndex)} style={{ color: "#2563eb" }}>+ Add Column</button>
                <button onClick={() => removeTable(tIndex)} style={{ color: "#dc2626", marginLeft: "auto" }}>Delete Table</button>
              </div>
            )}
          </div>
        ))}

        {!previewMode && <button onClick={addTable} style={{ fontSize: "14px", color: "#2563eb" }}>+ Add Table</button>}
      </div>
    </div>
  );
}
