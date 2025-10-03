// Internationalization (i18n) - Language translations

export const translations = {
  it: {
    // Header & Menu
    appTitle: "Composizione Classe",
    configuration: "Configurazione",
    menu: "Menu",
    
    // Action Buttons
    insertStudents: "Inserisci Studenti",
    shuffleStudents: "Shuffle Studenti",
    
    // Classroom Elements
    classroomElements: "Elementi Aula",
    desk: "Banco",
    teacherDesk: "Cattedra",
    
    // Student Management
    studentManagement: "Gestione Studenti",
    addStudent: "Aggiungi studente",
    studentNamePlaceholder: "Nome studente",
    noStudents: "Nessuno studente. Aggiungi il primo!",
    assigned: "Assegnato",
    unassigned: "Non assegnato",
    
    // Legend
    legend: "Legenda",
    
    // Grid Configuration
    gridDimensions: "Dimensioni Griglia",
    rows: "Righe",
    columns: "Colonne",
    applyChanges: "Applica Modifiche",
    
    // Saved Layouts
    savedLayouts: "Disposizioni Salvate",
    saveCurrentLayout: "+ Salva Disposizione Corrente",
    layoutNamePlaceholder: "Nome disposizione...",
    save: "Salva",
    cancel: "Annulla",
    load: "Carica",
    delete: "Elimina",
    noSavedLayouts: "Nessuna disposizione salvata",
    
    // Danger Zone
    dangerZone: "Zona Pericolosa",
    dangerZoneWarning: "Questa azione cancellerà tutti i dati salvati e resetterà l'applicazione.",
    clearAllData: "Cancella Tutti i Dati",
    
    // Tips
    tip: "Suggerimento",
    tipMessage: "Trascina i banchi dalla sidebar per creare il layout della classe, poi trascina gli studenti sui banchi per assegnarli.",
    
    // Alerts & Confirmations
    confirmClearData: "Sei sicuro di voler cancellare tutti i dati? Questa azione non può essere annullata.",
    confirmDeleteLayout: "Sei sicuro di voler eliminare questa disposizione?",
    layoutSaved: "Disposizione salvata con successo!",
    layoutLoaded: "Disposizione caricata con successo!",
    
    // Language
    language: "Lingua",
    italian: "Italiano",
    english: "English",
  },
  
  en: {
    // Header & Menu
    appTitle: "Classroom Composition",
    configuration: "Configuration",
    menu: "Menu",
    
    // Action Buttons
    insertStudents: "Insert Students",
    shuffleStudents: "Shuffle Students",
    
    // Classroom Elements
    classroomElements: "Classroom Elements",
    desk: "Desk",
    teacherDesk: "Teacher Desk",
    
    // Student Management
    studentManagement: "Student Management",
    addStudent: "Add student",
    studentNamePlaceholder: "Student name",
    noStudents: "No students. Add the first one!",
    assigned: "Assigned",
    unassigned: "Unassigned",
    
    // Legend
    legend: "Legend",
    
    // Grid Configuration
    gridDimensions: "Grid Dimensions",
    rows: "Rows",
    columns: "Columns",
    applyChanges: "Apply Changes",
    
    // Saved Layouts
    savedLayouts: "Saved Layouts",
    saveCurrentLayout: "+ Save Current Layout",
    layoutNamePlaceholder: "Layout name...",
    save: "Save",
    cancel: "Cancel",
    load: "Load",
    delete: "Delete",
    noSavedLayouts: "No saved layouts",
    
    // Danger Zone
    dangerZone: "Danger Zone",
    dangerZoneWarning: "This action will delete all saved data and reset the application.",
    clearAllData: "Clear All Data",
    
    // Tips
    tip: "Tip",
    tipMessage: "Drag desks from the sidebar to create the classroom layout, then drag students onto desks to assign them.",
    
    // Alerts & Confirmations
    confirmClearData: "Are you sure you want to clear all data? This action cannot be undone.",
    confirmDeleteLayout: "Are you sure you want to delete this layout?",
    layoutSaved: "Layout saved successfully!",
    layoutLoaded: "Layout loaded successfully!",
    
    // Language
    language: "Language",
    italian: "Italiano",
    english: "English",
  }
};

// Get translation function
export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations['it'][key] || key;
};

// Get current language from localStorage or default to Italian
export const getCurrentLanguage = () => {
  try {
    return localStorage.getItem('appLanguage') || 'it';
  } catch (error) {
    return 'it';
  }
};

// Save language to localStorage
export const saveLanguage = (lang) => {
  try {
    localStorage.setItem('appLanguage', lang);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

