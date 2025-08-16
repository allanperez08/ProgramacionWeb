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

   // Función para buscar Pokémon por nombre
  const handleSearch = async () => {
    if (!search) {
      setNotFound(false);
      return fetchPokemons(); // si está vacío, carga la página actual
    }
    setLoading(true);
    setNotFound(false);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokémon no encontrado");
      const data = await res.json();
      setPokemons([
        {
          id: data.id,
          name: data.name,
          img: data.sprites.other["official-artwork"].front_default,
          types: data.types.map((t) => t.type.name),
          abilities: data.abilities.map((a) => a.ability.name),
        },
      ]);
      setPage(1);
    } catch (error) {
      console.error("Pokémon no encontrado");
      setPokemons([]);
      setNotFound(true);
    }
    setLoading(false);
  };