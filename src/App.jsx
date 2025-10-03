import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SeatGrid from "./SeatGrid";
import StudentList from "./StudentList";
import ConfigMenu from "./ConfigMenu";

const STORAGE_KEY = "classroom-seating-data";

function App() {
  const [students] = useState([
    { id: 1, name: "Mario Rossi" },
    { id: 2, name: "Luca Bianchi" },
    { id: 3, name: "Anna Verdi" },
    { id: 4, name: "Giulia Neri" },
  ]);

  // Initialize state with lazy initialization to load from localStorage
  const [gridConfig, setGridConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        return data.gridConfig || { rows: 3, cols: 4 };
      }
    } catch (error) {
      console.error("Error loading grid config:", error);
    }
    return { rows: 3, cols: 4 };
  });

  const [seats, setSeats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        return data.seats || [];
      }
    } catch (error) {
      console.error("Error loading seats:", error);
    }
    return [];
  });

  // Initialize or update seats when gridConfig changes
  useEffect(() => {
    const expectedSeatsCount = gridConfig.rows * gridConfig.cols;

    if (seats.length !== expectedSeatsCount) {
      const newSeats = [];
      let id = 1;

      // Create a map of existing students by position
      const existingStudents = new Map();
      seats.forEach(seat => {
        if (seat.student) {
          const key = `${seat.row}-${seat.col}`;
          existingStudents.set(key, seat.student);
        }
      });

      // Create new grid, preserving students where possible
      for (let r = 0; r < gridConfig.rows; r++) {
        for (let c = 0; c < gridConfig.cols; c++) {
          const key = `${r}-${c}`;
          const existingStudent = existingStudents.get(key);
          newSeats.push({
            id: id++,
            row: r,
            col: c,
            student: existingStudent || null
          });
        }
      }
      setSeats(newSeats);
    }
  }, [gridConfig]); // Only depend on gridConfig, not seats

  // Save to localStorage whenever seats or gridConfig change
  useEffect(() => {
    // Don't save if seats is empty (initial state before grid is created)
    if (seats.length === 0 && gridConfig.rows * gridConfig.cols > 0) {
      return;
    }

    try {
      const dataToSave = {
        gridConfig,
        seats,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [seats, gridConfig]);

  const assignRandom = () => {
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    setSeats(seats.map((seat, i) => ({
      ...seat,
      student: shuffled[i] || null,
    })));
  };

  const shuffleSeats = () => {
    const assigned = seats.filter(s => s.student);
    const shuffled = assigned.map(s => s.student).sort(() => Math.random() - 0.5);
    let i = 0;
    setSeats(seats.map(s => ({
      ...s,
      student: s.student ? shuffled[i++] : null
    })));
  };

  const swapSeats = (id1, id2) => {
    const newSeats = [...seats];
    const idx1 = newSeats.findIndex(s => s.id === id1);
    const idx2 = newSeats.findIndex(s => s.id === id2);
    if (idx1 >= 0 && idx2 >= 0) {
      const tmp = newSeats[idx1].student;
      newSeats[idx1].student = newSeats[idx2].student;
      newSeats[idx2].student = tmp;
      setSeats(newSeats);
    }
  };

  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setGridConfig({ rows: 3, cols: 4 });
      setSeats([]);
    } catch (error) {
      console.error("Error clearing saved data:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "10px", fontFamily: "Arial", position: "relative" }}>
        <ConfigMenu
          gridConfig={gridConfig}
          setGridConfig={setGridConfig}
          assignRandom={assignRandom}
          shuffleSeats={shuffleSeats}
          clearSavedData={clearSavedData}
        />
        <h1 style={{ textAlign: "center" }}>Composizione Classe</h1>
        <div style={{ display: "flex", gap: "40px" }}>
          <SeatGrid seats={seats} gridConfig={gridConfig} swapSeats={swapSeats}/>
          <StudentList students={students} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
