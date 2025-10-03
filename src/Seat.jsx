import React from "react";
import { useDrag, useDrop } from "react-dnd";

export const ItemTypes = {
  SEAT: "seat",
  STUDENT: "student",
  DESK: "desk",
};

function Seat({ seat, swapSeats, assignStudentToSeat, addDeskToGrid, removeDeskFromGrid, toggleLock }) {
  // Only allow dragging if there's a student or if it's a desk, and not locked
  const canDrag = (seat.student || seat.hasDesk) && !seat.isLocked;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: seat.student ? ItemTypes.SEAT : ItemTypes.DESK,
    item: {
      id: seat.id,
      type: seat.student ? ItemTypes.SEAT : ItemTypes.DESK,
      seatId: seat.id,
      isNew: false // This is an existing desk/seat in the grid
    },
    canDrag: canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [seat.student, seat.hasDesk, seat.id]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [ItemTypes.SEAT, ItemTypes.STUDENT, ItemTypes.DESK],
    drop: (item) => {
      // Prevent dropping on itself
      if (item.seatId === seat.id) {
        return;
      }

      if (item.type === ItemTypes.STUDENT) {
        // Student from list being dropped
        assignStudentToSeat(item.studentId, seat.id);
      } else if (item.type === ItemTypes.SEAT) {
        // Swapping two seats with students
        swapSeats(item.id, seat.id);
      } else if (item.type === ItemTypes.DESK) {
        if (item.isNew === true) {
          // Adding a new desk from the sidebar
          addDeskToGrid(seat.id);
        } else {
          // Moving an existing desk within the grid
          swapSeats(item.seatId, seat.id);
        }
      }
    },
    canDrop: (item) => {
      // Can't drop on itself
      if (item.seatId === seat.id) {
        return false;
      }

      if (item.type === ItemTypes.STUDENT) {
        // Can only drop student on a desk without a student
        return seat.hasDesk && !seat.student;
      } else if (item.type === ItemTypes.DESK && item.isNew === true) {
        // Can only add new desk to empty cell (no desk already there)
        return !seat.hasDesk;
      } else if (item.type === ItemTypes.DESK && item.isNew === false) {
        // Can move existing desk anywhere
        return true;
      } else if (item.type === ItemTypes.SEAT) {
        // Can swap seats anywhere
        return true;
      }
      return false;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [seat.id, seat.hasDesk, seat.student, assignStudentToSeat, addDeskToGrid, swapSeats]);

  // Determine background color
  let background = "#f0f0f0"; // Empty grid cell
  if (seat.hasDesk) {
    if (seat.student) {
      background = "#d1f7d6"; // Desk with student
    } else {
      background = "#fff9e6"; // Empty desk
    }
  }
  if (isOver && canDrop) {
    background = "#ffe0b3"; // Valid drop target
  } else if (isOver && !canDrop) {
    background = "#ffcccc"; // Invalid drop target
  }

  const handleClick = () => {
    if (seat.hasDesk && seat.student) {
      // Toggle lock on click if there's a student
      toggleLock(seat.id);
    }
  };

  const handleDoubleClick = () => {
    if (seat.hasDesk && !seat.student) {
      // Remove desk on double-click if it's empty
      removeDeskFromGrid(seat.id);
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        width: "80px",
        height: "80px",
        border: seat.hasDesk ? (seat.isLocked ? "3px solid #FF6B6B" : "2px solid #333") : "1px dashed #ccc",
        background: background,
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: seat.student ? "pointer" : (canDrag ? "move" : "default"),
        fontSize: "12px",
        textAlign: "center",
        borderRadius: "4px",
        position: "relative",
        boxShadow: seat.isLocked ? "0 0 8px rgba(255, 107, 107, 0.5)" : "none",
      }}
      title={seat.student && seat.isLocked ? "Bloccato - Click per sbloccare" : seat.student ? "Click per bloccare" : ""}
    >
      {seat.isLocked && (
        <div style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          fontSize: "14px",
        }}>
          🔒
        </div>
      )}
      {seat.student ? seat.student.name.split(" ")[0] : seat.hasDesk ? "🪑" : ""}
    </div>
  );
}

export default Seat;
