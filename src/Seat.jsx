import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  SEAT: "seat",
};

function Seat({ seat, swapSeats }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SEAT,
    item: { id: seat.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.SEAT,
    drop: (item) => {
      if (item.id !== seat.id) {
        swapSeats(item.id, seat.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        width: "80px",
        height: "80px",
        border: "1px solid #333",
        background: isOver ? "#ffe0b3" : seat.student ? "#d1f7d6" : "#f0f0f0",
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "move",
      }}
    >
      {seat.student ? seat.student.name.split(" ")[0] : "Banco"}
    </div>
  );
}

export default Seat;
