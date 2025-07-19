import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

export default function DraggableFrontPageCard({ onPreview }) {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [nights, setNights] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "FrontPage",
    data: {
      type: "FrontPage",
      payload: {
        destination,
        days,
        nights,
        image: imageFile,
      },
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = () => setImageFile(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a .jpg or .png image.");
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-3 rounded-lg shadow cursor-move bg-white space-y-2 border border-indigo-300"
    >
      <h3 className="text-md font-semibold text-indigo-600">Front Page</h3>
      
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full p-1 border rounded text-sm"
      />

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-1/2 p-1 border rounded text-sm"
        />
        <input
          type="number"
          placeholder="Nights"
          value={nights}
          onChange={(e) => setNights(e.target.value)}
          className="w-1/2 p-1 border rounded text-sm"
        />
      </div>

      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageUpload}
        className="w-full text-xs text-gray-600"
      />

      {imageFile && (
        <img
          src={imageFile}
          alt="Preview"
          className="w-full h-28 object-cover rounded border"
        />
      )}
    </div>
  );
}
