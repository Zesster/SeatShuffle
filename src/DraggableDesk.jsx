import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Seat";

function DraggableDesk() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DESK,
    item: { type: ItemTypes.DESK, isNew: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: "80px",
        height: "80px",
        border: "2px solid #333",
        background: "#fff9e6",
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "move",
        fontSize: "24px",
        borderRadius: "4px",
        marginBottom: "10px",
      }}
    >
      🪑
    </div>
  );
}

export default DraggableDesk;

