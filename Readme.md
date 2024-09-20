# Project Setup
dictionary-web-app/
│
├── public/
│   └── index.html      # Main HTML file
│
├── src/
│   ├── components/
│   │   ├── AddWordForm.js     # Component to add a new word
│   │   ├── WordList.js        # Component to list words
│   │   ├── WordDetails.js     # Component to view/edit word details
│   │   ├── TopSearches.js     # Component to display top N searched words
│   │   └── SearchByTag.js     # Component to search by tags
│   │
│   ├── services/
│   │   └── api.js             # API service for interacting with backend
│   │
│   ├── App.js                 # Main application component
│   ├── index.js               # Entry point for React app
│   └── styles.css             # Styling
│
└── package.json               # Project dependencies and scripts
 
# Technology Stack
Frontend Framework: React (with hooks and functional components).
UI Library: Material-UI or Bootstrap for a cleaner design.
State Management: React Context API (or Redux if needed).
Routing: React Router for navigating between pages.
Styling: CSS or CSS-in-JS like styled-components.

# MOCK BE APIs

// Run JSON server
json-server --watch db.json --port 5000

// install MSW
npm install msw --save-dev



