import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Use contextBridge
// O `ipcRenderer` so existe quando rodando dentro do Electron (injetado pelo preload).
// O guard evita TypeError ao abrir a UI direto no navegador (ex.: http://localhost:5173).
if (window.ipcRenderer) {
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
}
