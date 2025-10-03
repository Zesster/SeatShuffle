import React from "react";
import Seat from "./Seat";

function SeatGrid({ seats, gridConfig, swapSeats }) {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridConfig.cols}, 80px)`,
        gap: "10px",
      }}
    >
      {seats.map((seat) => (
        <Seat key={seat.id} seat={seat} swapSeats={swapSeats} />
      ))}
    </div>
  );
}

export default SeatGrid;
