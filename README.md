# Classroom Seating App

A React-based interactive classroom seating arrangement application that allows teachers to manage and organize student seating with drag-and-drop functionality.

## 📋 Overview

This application provides an intuitive interface for teachers to:
- Create customizable classroom seating grids
- Assign students to seats randomly
- Shuffle existing seat assignments
- Manually rearrange students using drag-and-drop
- Visualize the classroom layout

## ✨ Features

### 🎯 Dynamic Grid Configuration
- Customize the number of rows and columns for your classroom layout
- Flexible grid that adapts to different classroom sizes
- Real-time grid updates when configuration changes

### 🎲 Random Assignment
- **Assign Random**: Automatically assigns all students to available seats randomly
- **Shuffle**: Redistributes already-assigned students to different seats while keeping the same students in the grid

### 🖱️ Drag-and-Drop Interface
- Intuitive drag-and-drop functionality to swap students between seats
- Visual feedback when dragging (opacity change) and hovering over drop targets (color change)
- Smooth interaction using React DnD library

### 📊 Student Management
- View complete list of students in the sidebar
- Visual distinction between occupied seats (green) and empty seats (gray)
- Displays student first names on occupied seats

### 💾 Persistent Storage
- **Auto-save**: Automatically saves the current seating arrangement and grid configuration to browser's localStorage
- **Auto-load**: Restores the last saved arrangement when you reload the page
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
   - Click "Applica" (Apply) to update the grid

2. **Assign Students**
   - Use "Assegna Random" to randomly assign all students to seats
   - Use "Shuffle" to redistribute already-assigned students

3. **Manual Arrangement**
   - Click and drag any occupied seat
   - Drop it onto another seat to swap the students
   - Visual feedback shows valid drop targets

4. **Data Persistence**
   - Your seating arrangement is automatically saved
   - Reload the page anytime - your layout will be preserved
   - Use "Cancella Dati Salvati" (Clear Saved Data) to reset everything

## 📁 Project Structure

```
classroom-app-shuffle/
├── src/
│   ├── App.jsx           # Main application component
│   ├── ConfigMenu.jsx    # Configuration menu for grid settings
│   ├── SeatGrid.jsx      # Grid layout component
│   ├── Seat.jsx          # Individual seat component with drag-drop
│   ├── StudentList.jsx   # Student list sidebar
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── README.md             # This file
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
Individual seat component with:
- Drag source functionality
- Drop target functionality
- Visual states (empty, occupied, dragging, hover)

### StudentList.jsx
Simple sidebar displaying all students in the class

## 🎨 Visual Indicators

- **Gray background** (#f0f0f0): Empty seat
- **Green background** (#d1f7d6): Occupied seat
- **Orange background** (#ffe0b3): Valid drop target (when hovering)
- **50% opacity**: Seat being dragged

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

