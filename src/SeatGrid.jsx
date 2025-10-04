import React from "react";
import Seat from "./Seat";

function SeatGrid({ seats, gridConfig, swapSeats, assignStudentToSeat, addDeskToGrid, removeDeskFromGrid, toggleLock, addTeacherDeskToGrid, removeTeacherDeskFromGrid, removeStudentFromSeat, dragEnabled = true }) {

  return (
    <div
      className="seat-grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridConfig.cols}, 80px)`,
        columnGap: "4px",
        rowGap: "0px",
        padding: "12px",
        background: "#fafafa",
        borderRadius: "8px",
        '--grid-cols': gridConfig.cols,
        width: "max-content",
      }}
    >
      {seats.map((seat) => (
        <Seat
          key={seat.id}
          seat={seat}
          swapSeats={swapSeats}
          assignStudentToSeat={assignStudentToSeat}
          addDeskToGrid={addDeskToGrid}
          removeDeskFromGrid={removeDeskFromGrid}
          toggleLock={toggleLock}
          addTeacherDeskToGrid={addTeacherDeskToGrid}
          removeTeacherDeskFromGrid={removeTeacherDeskFromGrid}
          removeStudentFromSeat={removeStudentFromSeat}
          dragEnabled={dragEnabled}
        />
      ))}
    </div>
  );
}

export default SeatGrid;
