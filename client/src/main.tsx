import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import "./globals.css"
import { BrowserRouter as Router } from 'react-router-dom'
import { StateContextProvider } from './context/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </StrictMode>,
)
