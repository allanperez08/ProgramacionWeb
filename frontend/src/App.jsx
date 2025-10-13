import { useState } from 'react';
import './App.css';

function App() {
  const [tab, setTab] = useState("hide");
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [revealed, setRevealed] = useState("");

  
  // Enviar secreto a la API
  const handleHide = async () => {
    const response = await fetch("http://localhost:8000/api/hide/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret })
    });
    const data = await response.json();
    setKey(data.key);
  };
  
  // Revelar secreto usando key
  const handleReveal = async () => {
    const response = await fetch(`http://localhost:8000/api/reveal/${key}/`);
    const data = await response.json();
    setRevealed(data.secret || data.error);
  };

  return (
    <div className="app-container">
      <h1>Secret Link 🔒</h1>
      <div className="tabs">
        <button onClick={() => setTab("hide")}>Ocultar</button>
        <button onClick={() => setTab("reveal")}>Revelar</button>
      </div>

      {tab === "hide" ? (
        <div className="tab-content">
          <textarea
            placeholder="Escribe tu secreto aquí..."
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <button onClick={handleHide}>Generar Link</button>
          {key && (
            <p>
              ✅ Tu clave es: <b>{key}</b>
            </p>
          )}
        </div>