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