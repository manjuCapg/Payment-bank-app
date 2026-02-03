import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppStream from './AppStream.jsx'

// Simple client-side routing based on path
const getApp = () => {
  const path = window.location.pathname;
  if (path.startsWith('/streamapp')) {
    return <AppStream />;
  }
  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {getApp()}
  </StrictMode>,
)
