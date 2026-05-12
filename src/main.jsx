import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Firebase ke liye basename hatana zaroori hai */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)