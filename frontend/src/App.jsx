import { useState } from 'react';
import './App.css';

function App() {
  const [tab, setTab] = useState("hide");
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [revealed, setRevealed] = useState("");