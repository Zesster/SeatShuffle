# Classroom Seating App / Composizione Classe

A React-based interactive classroom seating arrangement application that allows teachers to manage and organize student seating with drag-and-drop functionality.

**🌍 Multi-language support**: 🇮🇹 Italian / 🇬🇧 English

## 📋 Overview

This application provides an intuitive interface for teachers to:
- Create customizable classroom seating grids
- Drag and drop desks to populate the classroom layout
- Drag and drop students onto desks
- Assign students to seats randomly
- Shuffle existing seat assignments
- Manually rearrange desks and students using drag-and-drop
- Visualize the classroom layout
- Persist all changes automatically

## ✨ Features

### 🌍 Multi-Language Support
- **Italian (Italiano)** 🇮🇹 and **English** 🇬🇧 interface
- Language selector in the configuration menu
- Persistent language preference (saved in localStorage)
- All UI elements, buttons, labels, and messages are translated
- Easy to switch between languages on the fly

### 🎯 Dynamic Grid Configuration
- Customize the number of rows and columns for your classroom layout
- Flexible grid that adapts to different classroom sizes
- Real-time grid updates when configuration changes

### 🎲 Quick Assignment
- **Insert Students / Inserisci Studenti**: Automatically assigns all unassigned students to available seats randomly
- **Shuffle Students / Shuffle Studenti**: Redistributes already-assigned students to different seats while keeping the same students in the grid

### 🖱️ Drag-and-Drop Interface
- **Drag Desks**: Drag the desk icon (🪑) from the sidebar to any empty grid cell to place a desk
- **Drag Teacher Desk**: Drag the teacher desk icon (🏫) from the sidebar to place the teacher's desk
- **Drag Students**: Drag students from the list onto desks to assign them
- **Move Desks**: Drag desks within the grid to rearrange the classroom layout
- **Swap Students**: Drag students between desks to swap their positions
- **Lock Students**: Click on an occupied desk to lock/unlock the student (locked students won't be shuffled or moved)
- **Remove Students**: Click the ✕ icon (top-left) on a desk to remove the student (mobile-friendly)
- **Remove Desks**: Click the ✕ icon (top-right) on an empty desk to remove it (mobile-friendly)
- **Remove Teacher Desk**: Click the ✕ icon (top-right) on the teacher desk to remove it (mobile-friendly)
- Visual feedback when dragging (opacity change) and hovering over drop targets (color change)
- Color-coded drop zones: orange for valid drops, red for invalid drops
- Locked desks show a 🔒 icon and red border with glow effect
- Teacher desk has distinctive brown color and larger icon
- Smooth interaction using React DnD library

### 📊 Student Management
- **Add Students**: Add new students to your class with a simple form
- **Remove Students**: Remove students from the class (also removes them from any assigned seat)
- **No Pre-loaded Data**: Start with an empty class roster and build it yourself
- View complete list of students in the sidebar
- Assigned students are marked with a checkmark and crossed out
- Unassigned students can be dragged onto desks
- Each student has a ✕ button to remove them from the class
- Visual distinction between:
  - Empty grid cells (light gray with dashed border)
  - Empty desks (beige with solid border and chair emoji 🪑)
  - Occupied desks (green with student's first name)

### 💾 Persistent Storage
- **Auto-save**: Automatically saves the current seating arrangement and grid configuration to browser's localStorage
- **Auto-load**: Restores the last saved arrangement when you reload the page
- **Save Layouts**: Save multiple named classroom layouts (e.g., "Monday Morning", "Group Work", "Exam Setup")
- **Load Layouts**: Quickly switch between saved layouts
- **Manage Layouts**: View, load, and delete saved layouts from the configuration panel
- **Clear Data**: Option to reset and clear all saved data from the configuration menu

## 🛠️ Technology Stack

- **React 18.2.0** - UI framework
- **Vite 4.4.0** - Build tool and development server
- **React DnD 16.0.1** - Drag-and-drop functionality
- **React DnD HTML5 Backend** - HTML5 drag-and-drop backend

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd classroom-app-shuffle
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Usage

### Development Mode
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (default Vite port).

### Build for Production
Create an optimized production build:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## 🎮 How to Use

1. **Configure the Grid**
   - Click the hamburger menu (☰) in the top-left corner
   - Set the desired number of rows and columns
   - Click "Applica" (Apply) to create an empty grid

2. **Add Elements to the Classroom**
   - Drag the desk icon (🪑) from the sidebar to add student desks
   - Drag the teacher desk icon (🏫) from the sidebar to add the teacher's desk
   - Drop them onto any empty grid cell
   - Repeat to add as many desks as needed

3. **Assign Students to Desks**
   - **Manual Assignment**: Drag a student from the list and drop them onto a desk
   - **Random Assignment**: Click "Assegna Random" to randomly assign unassigned students to empty desks
   - **Shuffle**: Click "Shuffle" to redistribute already-assigned students among existing desks

4. **Lock/Unlock Students**
   - **Lock**: Click on a desk with a student to lock them in place
   - **Visual**: Locked desks show a 🔒 icon and red border
   - **Protection**: Locked students won't be moved during shuffle or drag operations

5. **Rearrange the Classroom**
   - **Move Desks**: Drag a desk (with or without a student) to a new position
   - **Swap Students**: Drag a student from one desk to another (if not locked)
   - **Remove Desks**: Double-click on an empty desk to remove it

6. **Save and Load Layouts**
   - Click "💾 Salva Disposizione Corrente" in the menu
   - Enter a name for your layout (e.g., "Monday Setup")
   - Your layout is saved and can be loaded anytime
   - Locked students are saved with the layout
   - View all saved layouts with their grid size and save date
   - Click 📂 to load a layout or 🗑️ to delete it

7. **Data Persistence**
   - Your current seating arrangement is automatically saved
   - Reload the page anytime - your layout will be preserved
   - Save multiple named layouts for different scenarios
   - Use "Cancella Dati Salvati" (Clear Saved Data) to reset everything

## 📁 Project Structure

```
classroom-app-shuffle/
├── src/
│   ├── App.jsx              # Main application component
│   ├── ConfigMenu.jsx       # Configuration menu for grid settings
│   ├── SeatGrid.jsx         # Grid layout component
│   ├── Seat.jsx             # Individual seat component with drag-drop
│   ├── StudentList.jsx      # Student list sidebar with draggable items
│   ├── DraggableDesk.jsx    # Draggable desk component
│   ├── DraggableStudent.jsx # Draggable student component
│   └── main.jsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── README.md                # This file
└── STORAGE.md               # Data persistence documentation
```

## 🎨 Component Overview

### App.jsx
Main application component that manages:
- Student data
- Grid configuration state
- Seat assignments
- Random assignment and shuffle logic
- localStorage integration for data persistence

### ConfigMenu.jsx
Collapsible menu providing:
- Grid dimension controls (rows/columns)
- Random assignment button
- Shuffle button
- Clear saved data button

### SeatGrid.jsx
Renders the classroom grid:
- Dynamically creates seats based on configuration
- Uses CSS Grid for layout
- Updates when grid configuration changes

### Seat.jsx
Individual seat/grid cell component with:
- Drag source functionality (for desks and students)
- Drop target functionality (accepts desks and students)
- Visual states (empty cell, empty desk, occupied desk, dragging, valid/invalid drop)
- Double-click to remove empty desks

### StudentList.jsx
Sidebar component displaying:
- Draggable desk icon for adding new desks
- List of all students (draggable if unassigned)
- Visual indication of assigned vs unassigned students

### DraggableDesk.jsx
Reusable desk component that can be dragged from the sidebar to the grid

### DraggableStudent.jsx
Student list item component with drag functionality and assignment status

## 🎨 Visual Indicators

### Grid Cells
- **Light gray with dashed border**: Empty grid cell (no desk)
- **Beige (#fff9e6) with solid border + ✕ (top-right)**: Empty desk (available for students)
- **Green (#d1f7d6) + ✕ (top-left)**: Desk with assigned student
- **Tan/Brown (#D2B48C) with thick brown border + ✕ (top-right)**: Teacher desk (🏫)
- **Red border with glow + 🔒 (top-right)**: Locked student (won't be shuffled or moved)
- **Orange (#ffe0b3)**: Valid drop target (when hovering)
- **Red (#ffcccc)**: Invalid drop target (when hovering)
- **50% opacity**: Item being dragged

### Delete Icons (✕)
- **Top-left ✕**: Remove student from desk (only on desks with students)
- **Top-right ✕**: Remove empty desk or teacher desk
- **Opacity 0.5-0.7**: Default state (always visible for mobile)
- **Opacity 1.0**: On hover (desktop)

### Student List
- **Normal text**: Unassigned student (can be dragged)
- **Crossed out with checkmark**: Assigned student (cannot be dragged)
- **Gray background**: Assigned student indicator

## 🔧 Customization

### Adding Students
Edit the `students` array in `App.jsx`:
```javascript
const [students] = useState([
  { id: 1, name: "Mario Rossi" },
  { id: 2, name: "Luca Bianchi" },
  // Add more students here
]);
```

### Default Grid Size
Modify the initial `gridConfig` in `App.jsx`:
```javascript
const [gridConfig, setGridConfig] = useState({ rows: 3, cols: 4 });
```

### Styling
Inline styles are used throughout the application. Modify the `style` props in each component to customize the appearance.

## 📝 License

This project is private and not licensed for public distribution.

## 🤝 Contributing

This is a private project. Contact the repository owner for contribution guidelines.

## 📧 Support

For issues or questions, please contact the project maintainer.

---

**Version**: 0.0.1  
**Built with**: React + Vite

