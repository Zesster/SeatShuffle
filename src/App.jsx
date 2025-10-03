import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SeatGrid from "./SeatGrid";
import StudentList from "./StudentList";
import ConfigMenu from "./ConfigMenu";
import { getCurrentLanguage, saveLanguage, getTranslation } from "./i18n";

const STORAGE_KEY = "classroom-seating-data";
const SAVED_LAYOUTS_KEY = "classroom-saved-layouts";

function App() {
  // Language state
  const [language, setLanguage] = useState(() => getCurrentLanguage());

  // Function to change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    saveLanguage(lang);
  };

  // Translation helper
  const t = (key) => getTranslation(language, key);

  // Load students from localStorage or start with empty array
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        return data.students || [];
      }
    } catch (error) {
      console.error("Error loading students:", error);
    }
    return [];
  });

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
        // Ensure all seats have the required properties
        const loadedSeats = (data.seats || []).map(seat => ({
          ...seat,
          hasDesk: seat.hasDesk ?? false,
          hasTeacherDesk: seat.hasTeacherDesk ?? false,
          student: seat.student || null,
          isLocked: seat.isLocked ?? false
        }));
        return loadedSeats;
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

      // Create a map of existing data by position
      const existingData = new Map();
      seats.forEach(seat => {
        const key = `${seat.row}-${seat.col}`;
        existingData.set(key, {
          student: seat.student,
          hasDesk: seat.hasDesk,
          hasTeacherDesk: seat.hasTeacherDesk,
          isLocked: seat.isLocked
        });
      });

      // Create new grid, preserving data where possible
      for (let r = 0; r < gridConfig.rows; r++) {
        for (let c = 0; c < gridConfig.cols; c++) {
          const key = `${r}-${c}`;
          const existing = existingData.get(key);
          newSeats.push({
            id: id++,
            row: r,
            col: c,
            student: existing?.student || null,
            hasDesk: existing?.hasDesk || false,
            hasTeacherDesk: existing?.hasTeacherDesk || false,
            isLocked: existing?.isLocked || false
          });
        }
      }
      setSeats(newSeats);
    }
  }, [gridConfig]); // Only depend on gridConfig, not seats

  // Save to localStorage whenever seats, gridConfig, or students change
  useEffect(() => {
    // Don't save if seats is empty (initial state before grid is created)
    if (seats.length === 0 && gridConfig.rows * gridConfig.cols > 0) {
      return;
    }

    try {
      const dataToSave = {
        gridConfig,
        seats,
        students,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [seats, gridConfig, students]);

  const assignRandom = () => {
    const desksWithoutStudents = seats.filter(s => s.hasDesk && !s.student);
    const unassignedStudents = students.filter(student =>
      !seats.some(seat => seat.student?.id === student.id)
    );

    const shuffled = [...unassignedStudents].sort(() => Math.random() - 0.5);
    const newSeats = [...seats];

    desksWithoutStudents.forEach((desk, i) => {
      if (shuffled[i]) {
        const idx = newSeats.findIndex(s => s.id === desk.id);
        if (idx >= 0) {
          newSeats[idx].student = shuffled[i];
        }
      }
    });

    setSeats(newSeats);
  };

  const shuffleSeats = () => {
    // Get only unlocked seats with students
    const unlockedSeats = seats.filter(s => s.student && !s.isLocked);
    const shuffledStudents = unlockedSeats.map(s => s.student).sort(() => Math.random() - 0.5);

    let i = 0;
    setSeats(seats.map(s => {
      // Keep locked students in place
      if (s.isLocked) {
        return s;
      }
      // Shuffle unlocked students
      if (s.student && !s.isLocked) {
        return { ...s, student: shuffledStudents[i++] };
      }
      return s;
    }));
  };

  const swapSeats = (id1, id2) => {
    const newSeats = [...seats];
    const idx1 = newSeats.findIndex(s => s.id === id1);
    const idx2 = newSeats.findIndex(s => s.id === id2);
    if (idx1 >= 0 && idx2 >= 0) {
      // Don't swap if either seat is locked
      if (newSeats[idx1].isLocked || newSeats[idx2].isLocked) {
        return;
      }

      // Swap students
      const tmpStudent = newSeats[idx1].student;
      newSeats[idx1].student = newSeats[idx2].student;
      newSeats[idx2].student = tmpStudent;

      // Swap desks
      const tmpDesk = newSeats[idx1].hasDesk;
      newSeats[idx1].hasDesk = newSeats[idx2].hasDesk;
      newSeats[idx2].hasDesk = tmpDesk;

      setSeats(newSeats);
    }
  };

  const assignStudentToSeat = (studentId, seatId) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const newSeats = seats.map(seat => {
      if (seat.id === seatId && !seat.isLocked) {
        return { ...seat, student };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  const addDeskToGrid = (seatId) => {
    const newSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, hasDesk: true };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  const addTeacherDeskToGrid = (seatId) => {
    const newSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, hasTeacherDesk: true };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  const removeDeskFromGrid = (seatId) => {
    const newSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, hasDesk: false, student: null, isLocked: false };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  const removeTeacherDeskFromGrid = (seatId) => {
    const newSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, hasTeacherDesk: false };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  const toggleLock = (seatId) => {
    const newSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, isLocked: !seat.isLocked };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  const removeStudentFromSeat = (seatId) => {
    const newSeats = seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, student: null, isLocked: false };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  // Add a new student to the class
  const addStudent = (studentName) => {
    if (!studentName || !studentName.trim()) {
      return;
    }
    const newStudent = {
      id: Date.now(), // Use timestamp as unique ID
      name: studentName.trim()
    };
    setStudents([...students, newStudent]);
  };

  // Remove a student from the class (and from any seat)
  const removeStudent = (studentId) => {
    // Remove from students list
    setStudents(students.filter(s => s.id !== studentId));

    // Remove from any seat they're assigned to
    const newSeats = seats.map(seat => {
      if (seat.student && seat.student.id === studentId) {
        return { ...seat, student: null, isLocked: false };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  // Get list of assigned student IDs
  const assignedStudentIds = new Set(
    seats.filter(s => s.student).map(s => s.student.id)
  );

  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setGridConfig({ rows: 3, cols: 4 });
      setSeats([]);
    } catch (error) {
      console.error("Error clearing saved data:", error);
    }
  };

  // Save current layout with a name
  const saveLayout = (layoutName) => {
    try {
      const savedLayouts = JSON.parse(localStorage.getItem(SAVED_LAYOUTS_KEY) || "{}");

      savedLayouts[layoutName] = {
        gridConfig,
        seats,
        students,
        savedAt: new Date().toISOString(),
      };

      localStorage.setItem(SAVED_LAYOUTS_KEY, JSON.stringify(savedLayouts));
      return true;
    } catch (error) {
      console.error("Error saving layout:", error);
      return false;
    }
  };

  // Load a saved layout
  const loadLayout = (layoutName) => {
    try {
      const savedLayouts = JSON.parse(localStorage.getItem(SAVED_LAYOUTS_KEY) || "{}");
      const layout = savedLayouts[layoutName];

      if (layout) {
        setGridConfig(layout.gridConfig);
        // Ensure all seats have the required properties
        const loadedSeats = layout.seats.map(seat => ({
          ...seat,
          hasDesk: seat.hasDesk ?? false,
          hasTeacherDesk: seat.hasTeacherDesk ?? false,
          student: seat.student || null,
          isLocked: seat.isLocked ?? false
        }));
        setSeats(loadedSeats);
        // Load students from layout
        setStudents(layout.students || []);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error loading layout:", error);
      return false;
    }
  };

  // Get all saved layouts
  const getSavedLayouts = () => {
    try {
      const savedLayouts = JSON.parse(localStorage.getItem(SAVED_LAYOUTS_KEY) || "{}");
      return Object.keys(savedLayouts).map(name => ({
        name,
        savedAt: savedLayouts[name].savedAt,
        gridConfig: savedLayouts[name].gridConfig,
      }));
    } catch (error) {
      console.error("Error getting saved layouts:", error);
      return [];
    }
  };

  // Delete a saved layout
  const deleteLayout = (layoutName) => {
    try {
      const savedLayouts = JSON.parse(localStorage.getItem(SAVED_LAYOUTS_KEY) || "{}");
      delete savedLayouts[layoutName];
      localStorage.setItem(SAVED_LAYOUTS_KEY, JSON.stringify(savedLayouts));
      return true;
    } catch (error) {
      console.error("Error deleting layout:", error);
      return false;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "10px", fontFamily: "Arial", position: "relative" }}>
        <ConfigMenu
          gridConfig={gridConfig}
          setGridConfig={setGridConfig}
          clearSavedData={clearSavedData}
          saveLayout={saveLayout}
          loadLayout={loadLayout}
          getSavedLayouts={getSavedLayouts}
          deleteLayout={deleteLayout}
          language={language}
          changeLanguage={changeLanguage}
          t={t}
        />

        <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
          <SeatGrid
            seats={seats}
            gridConfig={gridConfig}
            swapSeats={swapSeats}
            assignStudentToSeat={assignStudentToSeat}
            addDeskToGrid={addDeskToGrid}
            removeDeskFromGrid={removeDeskFromGrid}
            toggleLock={toggleLock}
            addTeacherDeskToGrid={addTeacherDeskToGrid}
            removeTeacherDeskFromGrid={removeTeacherDeskFromGrid}
            removeStudentFromSeat={removeStudentFromSeat}
          />
          <StudentList
            students={students}
            assignedStudentIds={assignedStudentIds}
            addStudent={addStudent}
            removeStudent={removeStudent}
            assignRandom={assignRandom}
            shuffleSeats={shuffleSeats}
            t={t}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
