import { useState } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0); // Para paginación
  const limit = 15; // Cantidad por página
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); // Página actual
  const [notFound, setNotFound] = useState(false); // Pokémon no encontrado
