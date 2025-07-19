function DraggableComponent({ type }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: type });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 rounded shadow cursor-move text-center font-medium ${colors[type]}`}
    >
      {type}
    </div>
  );
}