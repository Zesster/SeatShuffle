import React from "react";
import { useDrag, useDrop } from "react-dnd";

export const ItemTypes = {
  SEAT: "seat",
  STUDENT: "student",
  DESK: "desk",
  TEACHER_DESK: "teacher_desk",
};

function Seat({ seat, swapSeats, assignStudentToSeat, addDeskToGrid, removeDeskFromGrid, toggleLock, addTeacherDeskToGrid, removeTeacherDeskFromGrid, removeStudentFromSeat }) {
  // Only allow dragging if there's a student or if it's a desk/teacher desk, and not locked
  const canDrag = (seat.student || seat.hasDesk || seat.hasTeacherDesk) && !seat.isLocked;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: seat.hasTeacherDesk ? ItemTypes.TEACHER_DESK : (seat.student ? ItemTypes.SEAT : ItemTypes.DESK),
    item: {
      id: seat.id,
      type: seat.hasTeacherDesk ? ItemTypes.TEACHER_DESK : (seat.student ? ItemTypes.SEAT : ItemTypes.DESK),
      seatId: seat.id,
      isNew: false // This is an existing desk/seat in the grid
    },
    canDrag: canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [seat.student, seat.hasDesk, seat.hasTeacherDesk, seat.id]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: [ItemTypes.SEAT, ItemTypes.STUDENT, ItemTypes.DESK, ItemTypes.TEACHER_DESK],
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
      } else if (item.type === ItemTypes.TEACHER_DESK) {
        if (item.isNew === true) {
          // Adding a new teacher desk from the sidebar
          addTeacherDeskToGrid(seat.id);
        } else {
          // Moving an existing teacher desk within the grid
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
        // Can only drop student on a student desk without a student (NOT on teacher desk)
        return seat.hasDesk && !seat.student && !seat.hasTeacherDesk;
      } else if (item.type === ItemTypes.DESK && item.isNew === true) {
        // Can only add new desk to empty cell (no desk or teacher desk already there)
        return !seat.hasDesk && !seat.hasTeacherDesk;
      } else if (item.type === ItemTypes.TEACHER_DESK && item.isNew === true) {
        // Can only add new teacher desk to empty cell (no desk or teacher desk already there)
        return !seat.hasDesk && !seat.hasTeacherDesk;
      } else if (item.type === ItemTypes.DESK && item.isNew === false) {
        // Can move existing desk only to cells without teacher desk
        return !seat.hasTeacherDesk;
      } else if (item.type === ItemTypes.TEACHER_DESK && item.isNew === false) {
        // Can move existing teacher desk only to cells without student desk
        return !seat.hasDesk;
      } else if (item.type === ItemTypes.SEAT) {
        // Can swap seats only if target doesn't have teacher desk
        return !seat.hasTeacherDesk;
      }
      return false;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [seat.id, seat.hasDesk, seat.hasTeacherDesk, seat.student, assignStudentToSeat, addDeskToGrid, addTeacherDeskToGrid, swapSeats]);

  // Determine background color
  let background = "#f0f0f0"; // Empty grid cell
  if (seat.hasTeacherDesk) {
    background = "#D2B48C"; // Teacher desk (tan/brown)
  } else if (seat.hasDesk) {
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

  const handleClick = (e) => {
    // Don't trigger if clicking on delete button
    if (e.target.closest('.delete-btn')) {
      return;
    }

    if (seat.hasDesk && seat.student) {
      // Toggle lock on click if there's a student
      toggleLock(seat.id);
    }
  };

  const handleRemoveStudent = (e) => {
    e.stopPropagation();
    removeStudentFromSeat(seat.id);
  };

  const handleRemoveDesk = (e) => {
    e.stopPropagation();
    removeDeskFromGrid(seat.id);
  };

  const handleRemoveTeacherDesk = (e) => {
    e.stopPropagation();
    removeTeacherDeskFromGrid(seat.id);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={handleClick}
      style={{
        width: "80px",
        height: "80px",
        border: seat.hasTeacherDesk ? "3px solid #8B4513" : (seat.hasDesk ? (seat.isLocked ? "3px solid #FF6B6B" : "2px solid #333") : "1px dashed #ccc"),
        background: background,
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: seat.student ? "pointer" : (canDrag ? "move" : "default"),
        fontSize: seat.hasTeacherDesk ? "32px" : "12px",
        textAlign: "center",
        borderRadius: "4px",
        position: "relative",
        boxShadow: seat.isLocked ? "0 0 8px rgba(255, 107, 107, 0.5)" : (seat.hasTeacherDesk ? "0 2px 6px rgba(139, 69, 19, 0.4)" : "none"),
      }}
      title={
        seat.hasTeacherDesk ? "Cattedra" :
        (seat.student && seat.isLocked ? "Bloccato - Click per sbloccare" :
        (seat.student ? "Click per bloccare" : ""))
      }
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

      {/* Delete button for student */}
      {seat.student && !seat.isLocked && (
        <div
          className="delete-btn"
          onClick={handleRemoveStudent}
          style={{
            position: "absolute",
            top: "2px",
            left: "2px",
            fontSize: "14px",
            cursor: "pointer",
            opacity: 0.7,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = "0.7";
          }}
          title="Rimuovi studente"
        >
          ✕
        </div>
      )}

      {/* Delete button for empty desk */}
      {seat.hasDesk && !seat.student && (
        <div
          className="delete-btn"
          onClick={handleRemoveDesk}
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            fontSize: "14px",
            cursor: "pointer",
            opacity: 0.5,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = "0.5";
          }}
          title="Rimuovi banco"
        >
          ✕
        </div>
      )}

      {/* Delete button for teacher desk */}
      {seat.hasTeacherDesk && (
        <div
          className="delete-btn"
          onClick={handleRemoveTeacherDesk}
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            fontSize: "16px",
            cursor: "pointer",
            opacity: 0.5,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = "0.5";
          }}
          title="Rimuovi cattedra"
        >
          ✕
        </div>
      )}

      {seat.hasTeacherDesk ? (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Piano della scrivania */}
          <rect x="6" y="12" width="36" height="20" rx="2" fill="#654321" stroke="#3d2812" strokeWidth="2"/>
          {/* Dettaglio piano superiore */}
          <rect x="8" y="14" width="32" height="3" rx="1" fill="#8B4513" opacity="0.6"/>
          {/* Gambe anteriori */}
          <rect x="8" y="32" width="4" height="12" rx="1" fill="#654321" stroke="#3d2812" strokeWidth="1.5"/>
          <rect x="36" y="32" width="4" height="12" rx="1" fill="#654321" stroke="#3d2812" strokeWidth="1.5"/>
          {/* Cassetto */}
          <rect x="18" y="20" width="12" height="6" rx="1" fill="#3d2812" stroke="#2a1a08" strokeWidth="1"/>
          <circle cx="24" cy="23" r="1.5" fill="#8B4513"/>
        </svg>
      ) : (seat.student ? seat.student.name.split(" ")[0] : seat.hasDesk ? "🪑" : "")}
    </div>
  );
}

export default Seat;
