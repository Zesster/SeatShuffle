import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Seat";

function DraggableStudent({ student, isAssigned }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.STUDENT,
    item: { type: ItemTypes.STUDENT, studentId: student.id },
    canDrag: !isAssigned,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [student.id, isAssigned]);

  return (
    <li
      ref={drag}
      style={{
        padding: "8px",
        margin: "4px 0",
        background: isAssigned ? "#e0e0e0" : "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: isAssigned ? "not-allowed" : "move",
        opacity: isDragging ? 0.5 : isAssigned ? 0.6 : 1,
        textDecoration: isAssigned ? "line-through" : "none",
        listStyle: "none",
      }}
    >
      {student.name} {isAssigned ? "✓" : ""}
    </li>
  );
}

export default DraggableStudent;

