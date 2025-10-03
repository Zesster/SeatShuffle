import React from "react";

function StudentList({ students }) {
  return (
    <div>
      <h2>Lista Studenti</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
