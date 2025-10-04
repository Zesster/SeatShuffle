import React, { useState, useEffect } from "react";

function ConfigMenu({
  gridConfig,
  setGridConfig,
  clearSavedData,
  saveLayout,
  loadLayout,
  getSavedLayouts,
  deleteLayout,
  language,
  changeLanguage,
  t
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
    if (window.confirm(t('confirmClearData'))) {
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
        alert(t('layoutSaved'));
      }
    }
  };

  const handleLoadLayout = (name) => {
    const success = loadLayout(name);
    if (success) {
      setOpen(false);
      // Update rows and cols to match loaded config
      setRows(gridConfig.rows);
      setCols(gridConfig.cols);
      alert(t('layoutLoaded'));
    }
  };

  const handleDeleteLayout = (name) => {
    if (window.confirm(t('confirmDeleteLayout'))) {
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
        className="config-menu-button"
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          fontSize: "24px",
          background: "#2c3e50",
          color: "white",
          border: "none",
          cursor: "pointer",
          width: "50px",
          height: "50px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 1001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#34495e";
          e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#2c3e50";
          e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
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
            className="config-menu-panel"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "400px",
              height: "100vh",
              background: "#ffffff",
              color: "#2c3e50",
              padding: "80px 30px 30px 30px",
              zIndex: 1000,
              boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
              overflowY: "auto",
              animation: "slideIn 0.3s ease",
              borderRight: "1px solid #e0e0e0",
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

            {/* Header with Logo */}
            <div className="config-menu-header" style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "30px",
              paddingBottom: "20px",
              borderBottom: "1px solid #e9ecef"
            }}>
              <img
                src="/logo.png"
                alt="Logo"
                className="config-menu-logo"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain"
                }}
              />
              <div>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#2c3e50", lineHeight: "1.2" }}>
                  {t('appTitle')}
                </h2>
                <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6c757d" }}>
                  {t('configuration')}
                </p>
              </div>
            </div>

            {/* Grid Configuration Section */}
            <div className="config-section" style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #e9ecef",
            }}>
              <h3 style={{ marginTop: 0, fontSize: "14px", marginBottom: "15px", fontWeight: "600", color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {t('gridDimensions')}
              </h3>
              <div style={{ marginBottom: "15px" }}>
                <label className="config-label" style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "#495057", fontWeight: "500" }}>
                  {t('rows')}:
                </label>
                <input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  min="1"
                  max="20"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #dee2e6",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#495057",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label className="config-label" style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "#495057", fontWeight: "500" }}>
                  {t('columns')}:
                </label>
                <input
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(e.target.value)}
                  min="1"
                  max="20"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #dee2e6",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#495057",
                  }}
                />
              </div>
              <button
                onClick={applyChanges}
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
                {t('applyChanges')}
              </button>
            </div>

            {/* Saved Layouts Section */}
            <div className="config-section" style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #e9ecef",
            }}>
              <h3 style={{ marginTop: 0, fontSize: "14px", marginBottom: "15px", fontWeight: "600", color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {t('savedLayouts')}
              </h3>

              {/* Save Current Layout Button */}
              {!showSaveInput ? (
                <button
                  onClick={() => setShowSaveInput(true)}
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
                    marginBottom: "15px",
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
                  {t('saveCurrentLayout')}
                </button>
              ) : (
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="text"
                    placeholder={t('layoutNamePlaceholder')}
                    value={layoutName}
                    onChange={(e) => setLayoutName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSaveLayout();
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      fontSize: "14px",
                      border: "1px solid #dee2e6",
                      borderRadius: "6px",
                      marginBottom: "8px",
                      background: "#ffffff",
                      color: "#495057",
                    }}
                    autoFocus
                  />
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={handleSaveLayout}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        fontSize: "13px",
                        fontWeight: "500",
                        background: "#2c3e50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      {t('save')}
                    </button>
                    <button
                      onClick={() => {
                        setShowSaveInput(false);
                        setLayoutName("");
                      }}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        fontSize: "13px",
                        fontWeight: "500",
                        background: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      {t('cancel')}
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
                        background: "#ffffff",
                        padding: "12px",
                        borderRadius: "6px",
                        marginBottom: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "500", marginBottom: "4px", color: "#2c3e50", fontSize: "14px" }}>
                          {layout.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6c757d" }}>
                          {layout.gridConfig.rows}×{layout.gridConfig.cols} • {new Date(layout.savedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button
                          onClick={() => handleLoadLayout(layout.name)}
                          style={{
                            padding: "6px 10px",
                            fontSize: "12px",
                            background: "#ffffff",
                            color: "#2c3e50",
                            border: "1px solid #dee2e6",
                            borderRadius: "4px",
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
                          title={t('load')}
                        >
                          {t('load')}
                        </button>
                        <button
                          onClick={() => handleDeleteLayout(layout.name)}
                          style={{
                            padding: "6px 10px",
                            fontSize: "12px",
                            background: "#ffffff",
                            color: "#dc3545",
                            border: "1px solid #dc3545",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "#dc3545";
                            e.target.style.color = "#ffffff";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "#ffffff";
                            e.target.style.color = "#dc3545";
                          }}
                          title={t('delete')}
                        >
                          {t('delete')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{
                  fontSize: "13px",
                  color: "#6c757d",
                  textAlign: "center",
                  margin: 0,
                  padding: "20px 0"
                }}>
                  {t('noSavedLayouts')}
                </p>
              )}
            </div>

            {/* Language Selector */}
            <div className="config-section" style={{
              background: "#f8f9fa",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #e9ecef",
            }}>
              <h3 style={{ marginTop: 0, fontSize: "14px", marginBottom: "15px", fontWeight: "600", color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {t('language')}
              </h3>
              <div className="language-selector" style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => changeLanguage('it')}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    background: language === 'it' ? "#2c3e50" : "#ffffff",
                    color: language === 'it' ? "#ffffff" : "#2c3e50",
                    border: `1px solid ${language === 'it' ? "#2c3e50" : "#dee2e6"}`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (language !== 'it') {
                      e.target.style.background = "#f8f9fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== 'it') {
                      e.target.style.background = "#ffffff";
                    }
                  }}
                >
                  🇮🇹 {t('italian')}
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    background: language === 'en' ? "#2c3e50" : "#ffffff",
                    color: language === 'en' ? "#ffffff" : "#2c3e50",
                    border: `1px solid ${language === 'en' ? "#2c3e50" : "#dee2e6"}`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (language !== 'en') {
                      e.target.style.background = "#f8f9fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== 'en') {
                      e.target.style.background = "#ffffff";
                    }
                  }}
                >
                  🇬🇧 {t('english')}
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="config-section" style={{
              background: "#fff5f5",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #feb2b2",
            }}>
              <h3 style={{ marginTop: 0, fontSize: "14px", marginBottom: "10px", fontWeight: "600", color: "#c53030", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {t('dangerZone')}
              </h3>
              <p style={{ fontSize: "13px", marginBottom: "15px", color: "#742a2a" }}>
                {t('dangerZoneWarning')}
              </p>
              <button
                onClick={handleClearData}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: "500",
                  background: "#ffffff",
                  color: "#dc3545",
                  border: "1px solid #dc3545",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#dc3545";
                  e.target.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#ffffff";
                  e.target.style.color = "#dc3545";
                }}
              >
                {t('clearAllData')}
              </button>
            </div>

            {/* Info Section */}
            <div style={{
              marginTop: "30px",
              padding: "15px",
              background: "#f8f9fa",
              borderRadius: "8px",
              fontSize: "12px",
              border: "1px solid #e9ecef",
            }}>
              <p style={{ margin: "0 0 5px 0", color: "#495057", fontWeight: "500" }}>{t('tip')}</p>
              <p style={{ margin: 0, color: "#6c757d" }}>
                {t('tipMessage')}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ConfigMenu;
