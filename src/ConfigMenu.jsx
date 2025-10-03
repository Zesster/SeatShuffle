import React, { useState, useEffect } from "react";

function ConfigMenu({
  gridConfig,
  setGridConfig,
  assignRandom,
  shuffleSeats,
  clearSavedData,
  saveLayout,
  loadLayout,
  getSavedLayouts,
  deleteLayout
}) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(gridConfig.rows);
  const [cols, setCols] = useState(gridConfig.cols);
  const [layoutName, setLayoutName] = useState("");
  const [savedLayouts, setSavedLayouts] = useState([]);
  const [showSaveInput, setShowSaveInput] = useState(false);

  // Update saved layouts list when panel opens
  useEffect(() => {
    if (open) {
      setSavedLayouts(getSavedLayouts());
    }
  }, [open, getSavedLayouts]);

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

  const handleSaveLayout = () => {
    if (layoutName.trim()) {
      const success = saveLayout(layoutName.trim());
      if (success) {
        setLayoutName("");
        setShowSaveInput(false);
        setSavedLayouts(getSavedLayouts());
        alert(`Disposizione "${layoutName}" salvata con successo!`);
      } else {
        alert("Errore nel salvataggio della disposizione.");
      }
    }
  };

  const handleLoadLayout = (name) => {
    if (window.confirm(`Caricare la disposizione "${name}"? La disposizione corrente verrà sostituita.`)) {
      const success = loadLayout(name);
      if (success) {
        setOpen(false);
        // Update rows and cols to match loaded config
        setRows(gridConfig.rows);
        setCols(gridConfig.cols);
      } else {
        alert("Errore nel caricamento della disposizione.");
      }
    }
  };

  const handleDeleteLayout = (name) => {
    if (window.confirm(`Eliminare la disposizione "${name}"? Questa azione non può essere annullata.`)) {
      const success = deleteLayout(name);
      if (success) {
        setSavedLayouts(getSavedLayouts());
        alert(`Disposizione "${name}" eliminata.`);
      } else {
        alert("Errore nell'eliminazione della disposizione.");
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          fontSize: "28px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          zIndex: 1001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 8px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              animation: "fadeIn 0.3s ease",
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "400px",
              height: "100vh",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "80px 30px 30px 30px",
              zIndex: 1000,
              boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
              overflowY: "auto",
              animation: "slideIn 0.3s ease",
            }}
          >
            <style>
              {`
                @keyframes slideIn {
                  from {
                    transform: translateX(-100%);
                  }
                  to {
                    transform: translateX(0);
                  }
                }
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
              `}
            </style>

            <h2 style={{ marginTop: 0, fontSize: "28px", marginBottom: "30px" }}>
              ⚙️ Configurazione
            </h2>

            {/* Grid Configuration Section */}
            <div style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              backdropFilter: "blur(10px)",
            }}>
              <h3 style={{ marginTop: 0, fontSize: "18px", marginBottom: "15px" }}>
                📐 Dimensioni Griglia
              </h3>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
                  Righe:
                </label>
                <input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  min="1"
                  max="20"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 0.9)",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
                  Colonne:
                </label>
                <input
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(e.target.value)}
                  min="1"
                  max="20"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 0.9)",
                  }}
                />
              </div>
              <button
                onClick={applyChanges}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.background = "#45a049"}
                onMouseLeave={(e) => e.target.style.background = "#4CAF50"}
              >
                ✓ Applica Modifiche
              </button>
            </div>

            {/* Actions Section */}
            <div style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              backdropFilter: "blur(10px)",
            }}>
              <h3 style={{ marginTop: 0, fontSize: "18px", marginBottom: "15px" }}>
                🎲 Azioni Rapide
              </h3>
              <button
                onClick={() => {
                  assignRandom();
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.background = "#0b7dda"}
                onMouseLeave={(e) => e.target.style.background = "#2196F3"}
              >
                🎯 Assegna Random
              </button>
              <button
                onClick={() => {
                  shuffleSeats();
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#FF9800",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.background = "#e68900"}
                onMouseLeave={(e) => e.target.style.background = "#FF9800"}
              >
                🔀 Shuffle Studenti
              </button>
            </div>

            {/* Saved Layouts Section */}
            <div style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              backdropFilter: "blur(10px)",
            }}>
              <h3 style={{ marginTop: 0, fontSize: "18px", marginBottom: "15px" }}>
                💾 Disposizioni Salvate
              </h3>

              {/* Save Current Layout Button */}
              {!showSaveInput ? (
                <button
                  onClick={() => setShowSaveInput(true)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    background: "#9C27B0",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "15px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.target.style.background = "#7B1FA2"}
                  onMouseLeave={(e) => e.target.style.background = "#9C27B0"}
                >
                  💾 Salva Disposizione Corrente
                </button>
              ) : (
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="text"
                    placeholder="Nome disposizione..."
                    value={layoutName}
                    onChange={(e) => setLayoutName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSaveLayout();
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "14px",
                      border: "none",
                      borderRadius: "5px",
                      marginBottom: "8px",
                      background: "rgba(255, 255, 255, 0.9)",
                    }}
                    autoFocus
                  />
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={handleSaveLayout}
                      style={{
                        flex: 1,
                        padding: "10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        background: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      ✓ Salva
                    </button>
                    <button
                      onClick={() => {
                        setShowSaveInput(false);
                        setLayoutName("");
                      }}
                      style={{
                        flex: 1,
                        padding: "10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        background: "#757575",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      ✕ Annulla
                    </button>
                  </div>
                </div>
              )}

              {/* List of Saved Layouts */}
              {savedLayouts.length > 0 ? (
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {savedLayouts.map((layout) => (
                    <div
                      key={layout.name}
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                          {layout.name}
                        </div>
                        <div style={{ fontSize: "11px", opacity: 0.8 }}>
                          {layout.gridConfig.rows}×{layout.gridConfig.cols} • {new Date(layout.savedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button
                          onClick={() => handleLoadLayout(layout.name)}
                          style={{
                            padding: "8px 12px",
                            fontSize: "12px",
                            background: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          title="Carica questa disposizione"
                        >
                          📂
                        </button>
                        <button
                          onClick={() => handleDeleteLayout(layout.name)}
                          style={{
                            padding: "8px 12px",
                            fontSize: "12px",
                            background: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                          title="Elimina questa disposizione"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{
                  fontSize: "13px",
                  opacity: 0.7,
                  textAlign: "center",
                  margin: 0,
                  padding: "20px 0"
                }}>
                  Nessuna disposizione salvata
                </p>
              )}
            </div>

            {/* Danger Zone */}
            <div style={{
              background: "rgba(255, 107, 107, 0.2)",
              padding: "20px",
              borderRadius: "10px",
              border: "2px solid rgba(255, 107, 107, 0.5)",
              backdropFilter: "blur(10px)",
            }}>
              <h3 style={{ marginTop: 0, fontSize: "18px", marginBottom: "10px" }}>
                ⚠️ Zona Pericolosa
              </h3>
              <p style={{ fontSize: "13px", marginBottom: "15px", opacity: 0.9 }}>
                Questa azione cancellerà tutti i dati salvati e resetterà l'applicazione.
              </p>
              <button
                onClick={handleClearData}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.background = "#da190b"}
                onMouseLeave={(e) => e.target.style.background = "#f44336"}
              >
                🗑️ Cancella Tutti i Dati
              </button>
            </div>

            {/* Info Section */}
            <div style={{
              marginTop: "30px",
              padding: "15px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "8px",
              fontSize: "12px",
              opacity: 0.8,
            }}>
              <p style={{ margin: "0 0 5px 0" }}>💡 <strong>Suggerimento:</strong></p>
              <p style={{ margin: 0 }}>
                Trascina i banchi dalla sidebar per creare il layout della classe,
                poi trascina gli studenti sui banchi per assegnarli.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ConfigMenu;
