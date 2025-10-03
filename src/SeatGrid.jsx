import React from "react";
import Seat from "./Seat";

function SeatGrid({ seats, gridConfig, swapSeats, assignStudentToSeat, addDeskToGrid, removeDeskFromGrid, toggleLock }) {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridConfig.cols}, 80px)`,
        gap: "10px",
        padding: "20px",
        background: "#fafafa",
        borderRadius: "8px",
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
        />
      ))}
    </div>
  );
}

export default SeatGrid;
