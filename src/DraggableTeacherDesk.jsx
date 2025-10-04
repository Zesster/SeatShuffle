import { useDrag } from "react-dnd";
import { ItemTypes } from "./Seat";

function DraggableTeacherDesk({ dragEnabled = true }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TEACHER_DESK,
    item: { type: ItemTypes.TEACHER_DESK, isNew: true },
    canDrag: dragEnabled,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [dragEnabled]);

  return (
    <div
      ref={drag}
      style={{
        width: "80px",
        height: "80px",
        background: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
        border: "3px solid #654321",
        borderRadius: "8px",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(139, 69, 19, 0.4)",
        transition: "all 0.3s ease",
        touchAction: dragEnabled ? "none" : "auto",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.05)";
        e.target.style.boxShadow = "0 4px 10px rgba(139, 69, 19, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 2px 6px rgba(139, 69, 19, 0.4)";
      }}
      title="Trascina per aggiungere la cattedra"
    >
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
    </div>
  );
}

export default DraggableTeacherDesk;

