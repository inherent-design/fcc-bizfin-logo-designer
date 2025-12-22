import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toast } from '@base-ui/react/toast'
import './index.css'
import App from './App.tsx'
import { initTheme } from './utils/theme'

// Initialize theme based on system preference
initTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toast.Provider>
      <App />
    </Toast.Provider>
  </StrictMode>
)
