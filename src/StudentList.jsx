import React, { useState } from "react";
import DraggableStudent from "./DraggableStudent";
import DraggableDesk from "./DraggableDesk";
import DraggableTeacherDesk from "./DraggableTeacherDesk";

function StudentList({ students, assignedStudentIds, addStudent, removeStudent, assignRandom, shuffleSeats, t, dragEnabled = true }) {
  const [newStudentName, setNewStudentName] = useState("");
  const [classroomElementsOpen, setClassroomElementsOpen] = useState(true);
  const [studentManagementOpen, setStudentManagementOpen] = useState(true);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      addStudent(newStudentName);
      setNewStudentName("");
    }
  };

  return (
    <div style={{ minWidth: "200px" }}>
      {/* Action Buttons */}
      <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={assignRandom}
          style={{
            width: "100%",
            padding: "10px 16px",
            fontSize: "14px",
            fontWeight: "500",
            background: "#2c3e50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => e.target.style.background = "#34495e"}
          onMouseLeave={(e) => e.target.style.background = "#2c3e50"}
        >
          {t('insertStudents')}
        </button>
        <button
          onClick={shuffleSeats}
          style={{
            width: "100%",
            padding: "10px 16px",
            fontSize: "14px",
            fontWeight: "500",
            background: "#ffffff",
            color: "#2c3e50",
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#2c3e50";
            e.target.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#ffffff";
            e.target.style.color = "#2c3e50";
          }}
        >
          {t('shuffleStudents')}
        </button>
      </div>

      {/* Classroom Elements Section */}
      <div style={{
        marginBottom: "20px",
        background: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #e9ecef",
        overflow: "hidden"
      }}>
        <button
          onClick={() => setClassroomElementsOpen(!classroomElementsOpen)}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "#ffffff",
            border: "none",
            borderBottom: classroomElementsOpen ? "1px solid #e9ecef" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "14px",
            fontWeight: "600",
            color: "#2c3e50",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => e.target.style.background = "#f8f9fa"}
          onMouseLeave={(e) => e.target.style.background = "#ffffff"}
        >
          <span>{t('classroomElements')}</span>
          <span style={{ fontSize: "12px", color: "#6c757d" }}>
            {classroomElementsOpen ? "▼" : "▶"}
          </span>
        </button>

        {classroomElementsOpen && (
          <div style={{ padding: "16px" }}>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "12px", margin: "0 0 12px 0" }}>
              {t('tipMessage')}
            </p>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <DraggableDesk dragEnabled={dragEnabled} />
              <DraggableTeacherDesk dragEnabled={dragEnabled} />
            </div>
            <p style={{ fontSize: "11px", color: "#999", marginTop: "5px", margin: "5px 0 0 0" }}>
              🪑 {t('desk')} • 📋 {t('teacherDesk')}
            </p>
          </div>
        )}
      </div>

      {/* Student Management Section */}
      <div style={{
        background: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #e9ecef",
        overflow: "hidden"
      }}>
        <button
          onClick={() => setStudentManagementOpen(!studentManagementOpen)}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "#ffffff",
            border: "none",
            borderBottom: studentManagementOpen ? "1px solid #e9ecef" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "14px",
            fontWeight: "600",
            color: "#2c3e50",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => e.target.style.background = "#f8f9fa"}
          onMouseLeave={(e) => e.target.style.background = "#ffffff"}
        >
          <span>{t('studentManagement')}</span>
          <span style={{ fontSize: "12px", color: "#6c757d" }}>
            {studentManagementOpen ? "▼" : "▶"}
          </span>
        </button>

        {studentManagementOpen && (
          <div style={{ padding: "16px" }}>
            {/* Add student form */}
            <form onSubmit={handleAddStudent} style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder={t('studentNamePlaceholder')}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px"
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "8px 12px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold"
                  }}
                >
                  ➕
                </button>
              </div>
            </form>

            {students.length === 0 ? (
              <p style={{ fontSize: "12px", color: "#999", fontStyle: "italic", margin: 0 }}>
                {t('noStudents')}
              </p>
            ) : (
              <div className="student-scroll-container" style={{
                maxHeight: "400px",
                overflowY: "auto",
                overflowX: "hidden",
                paddingRight: "5px",
                marginRight: "-5px",
                WebkitOverflowScrolling: "touch"
              }}>
                <ul style={{ padding: 0, margin: 0 }}>
                  {students.map((student) => (
                    <li
                      key={student.id}
                      style={{
                        position: "relative",
                        marginBottom: "2px"
                      }}
                    >
                      <DraggableStudent
                        student={student}
                        isAssigned={assignedStudentIds.has(student.id)}
                        dragEnabled={dragEnabled}
                      />
                      <button
                        onClick={() => removeStudent(student.id)}
                        style={{
                          position: "absolute",
                          right: "5px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          padding: "2px 6px",
                          background: "transparent",
                          color: "#f44336",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          opacity: 0.6,
                          transition: "opacity 0.2s"
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = "1"}
                        onMouseLeave={(e) => e.target.style.opacity = "0.6"}
                        title="Rimuovi studente dalla classe"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
