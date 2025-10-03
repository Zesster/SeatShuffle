import React from "react";
import DraggableStudent from "./DraggableStudent";
import DraggableDesk from "./DraggableDesk";

function StudentList({ students, assignedStudentIds }) {
  return (
    <div style={{ minWidth: "200px" }}>
      <div style={{ marginBottom: "30px" }}>
        <h2>Banchi</h2>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
          Trascina un banco nella griglia
        </p>
        <DraggableDesk />
        <p style={{ fontSize: "11px", color: "#999", marginTop: "5px" }}>
          Doppio click su un banco vuoto per rimuoverlo
        </p>
      </div>

      <div>
        <h2>Lista Studenti</h2>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
          Trascina uno studente su un banco
        </p>
        <ul style={{ padding: 0 }}>
          {students.map((student) => (
            <DraggableStudent
              key={student.id}
              student={student}
              isAssigned={assignedStudentIds.has(student.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentList;
