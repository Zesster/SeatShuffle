# Data Persistence Documentation

## Overview

The Classroom Seating App uses the browser's **localStorage** API to automatically save and restore seating arrangements. This ensures that your classroom layout persists across browser sessions.

## What Gets Saved

The application saves the following data:

1. **Grid Configuration**
   - Number of rows
   - Number of columns

2. **Seat Assignments**
   - All seat positions
   - Student assignments to each seat
   - Empty seat states

3. **Metadata**
   - Last update timestamp

## Storage Key

Data is stored under the key: `classroom-seating-data`

## Data Structure

```json
{
  "gridConfig": {
    "rows": 3,
    "cols": 4
  },
  "seats": [
    {
      "id": 1,
      "row": 0,
      "col": 0,
      "student": {
        "id": 1,
        "name": "Mario Rossi"
      }
    },
    // ... more seats
  ],
  "lastUpdated": "2025-10-03T10:30:00.000Z"
}
```

## How It Works

### Auto-Save
- Triggered automatically whenever:
  - Grid configuration changes
  - Students are assigned or shuffled
  - Seats are swapped via drag-and-drop
- Uses React's `useEffect` hook to monitor state changes
- Saves data in JSON format to localStorage

### Auto-Load
- Runs once when the application first loads
- Attempts to retrieve saved data from localStorage
- Falls back to default values if no saved data exists
- Handles errors gracefully (e.g., corrupted data, quota exceeded)

### Clear Data
- Available through the configuration menu
- Prompts for confirmation before clearing
- Removes all saved data from localStorage
- Resets to default grid configuration (3 rows × 4 columns)
- Clears all seat assignments

## Browser Compatibility

localStorage is supported in all modern browsers:
- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge (all versions)
- Opera 10.5+

## Storage Limits

- Most browsers allow 5-10 MB of localStorage per domain
- This application uses minimal storage (typically < 10 KB)
- No risk of exceeding quota under normal usage

## Privacy & Security

- Data is stored **locally** in the browser only
- No data is sent to any server
- Data persists until:
  - User clears browser data
  - User clicks "Clear Saved Data" button
  - localStorage is manually cleared

## Troubleshooting

### Data Not Saving
1. Check if localStorage is enabled in browser settings
2. Ensure you're not in private/incognito mode (some browsers disable localStorage)
3. Check browser console for errors

### Data Not Loading
1. Check browser console for parsing errors
2. Try clearing saved data and starting fresh
3. Verify localStorage is not full

### Clearing Data Manually

You can manually clear the saved data using browser developer tools:

```javascript
// Open browser console and run:
localStorage.removeItem('classroom-seating-data');
```

Or clear all localStorage:

```javascript
localStorage.clear();
```

## Future Enhancements

Potential improvements for data persistence:

1. **Export/Import**
   - Export seating arrangement to JSON file
   - Import previously saved arrangements

2. **Multiple Layouts**
   - Save multiple classroom configurations
   - Switch between different layouts

3. **Cloud Sync**
   - Optional cloud storage for cross-device access
   - Requires backend implementation

4. **Version Control**
   - Keep history of previous arrangements
   - Undo/redo functionality

5. **Data Validation**
   - Schema validation on load
   - Migration support for data format changes

