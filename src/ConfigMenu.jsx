import React, { useState } from "react";

function ConfigMenu({ gridConfig, setGridConfig, assignRandom, shuffleSeats, clearSavedData }) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(gridConfig.rows);
  const [cols, setCols] = useState(gridConfig.cols);

  const applyChanges = () => {
    setGridConfig({ rows: Number(rows), cols: Number(cols) });
    setOpen(false);
  };

  const handleClearData = () => {
    if (window.confirm("Sei sicuro di voler cancellare tutti i dati salvati?")) {
      clearSavedData();
      setOpen(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "10px",
            background: "white",
            border: "1px solid #ccc",
            padding: "10px",
            zIndex: 100,
          }}
        >
          <h3>Configurazione Griglia</h3>
          <label>
            Righe:
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              min="1"
              style={{ width: "60px", marginLeft: "10px" }}
            />
          </label>
          <br />
          <label>
            Colonne:
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(e.target.value)}
              min="1"
              style={{ width: "60px", marginLeft: "10px" }}
            />
          </label>
          <br />
          <button onClick={applyChanges} style={{ marginTop: "10px" }}>
            Applica
          </button>
          <hr />
          <button onClick={assignRandom} style={{ marginTop: "10px", display: "block" }}>
            Assegna Random
          </button>
          <button onClick={shuffleSeats} style={{ marginTop: "10px", display: "block" }}>
            Shuffle
          </button>
          <hr />
          <button
            onClick={handleClearData}
            style={{
              marginTop: "10px",
              display: "block",
              background: "#ff6b6b",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "3px"
            }}
          >
            Cancella Dati Salvati
          </button>
        </div>
      )}
    </div>
  );
}

export default ConfigMenu;
