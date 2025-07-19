import { useState } from "react";

export default function useDragDrop() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  const reorderItems = (startIndex, endIndex) => {
    const newItems = Array.from(items);
    const [moved] = newItems.splice(startIndex, 1);
    newItems.splice(endIndex, 0, moved);
    setItems(newItems);
  };

  return { items, addItem, reorderItems };
}
