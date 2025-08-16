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

  // Función para cargar Pokémon con paginación
  const fetchPokemons = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          const pokeData = await res.json();
          return {
            id: pokeData.id,
            name: pokeData.name,
            img: pokeData.sprites.other["official-artwork"].front_default,
            types: pokeData.types.map((t) => t.type.name),
            abilities: pokeData.abilities.map((a) => a.ability.name),
          };
        })
      );

      setPokemons(pokemonDetails);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
    setLoading(false);
  };

  // Botón Siguiente
  const handleNext = () => {
    setOffset(offset + limit);
    setPage(page + 1);
    fetchPokemons();
  };

  // Botón Anterior
  const handlePrev = () => {
    if (offset === 0) return;
    setOffset(offset - limit);
    setPage(page - 1);
    fetchPokemons();
  };

  return (
    <div className="AppPokemon">
      <h1>Mi Pokedex</h1>

      {/* Cuadro de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          Buscar
        </button>
        <button
          onClick={() => {
            setSearch("");
            setOffset(0);
            setPage(1);
            fetchPokemons();
          }}
          disabled={loading}
        >
          Reset
        </button>
      </div>

      {/* Botones de paginación y indicador de página */}
      <div className="pagination-buttons">
        <button onClick={handlePrev} disabled={offset === 0 || loading}>
          Anterior
        </button>
        <span className="page-indicator">Página {page}</span>
        <button onClick={handleNext} disabled={loading}>
          Siguiente {limit}
        </button>
      </div>

      {/* Mensaje si no se encuentra Pokémon */}
      {notFound && <p className="not-found">¡Pokémon no encontrado!</p>}

      {/* Grid de tarjetas */}
      <div className="pokemon-grid">
        {pokemons.map((poke) => (
          <div key={poke.id} className="pokemon-card">
            <img src={poke.img} alt={poke.name} className="pokemon-img" />
            <h2>{poke.name}</h2>
            <p>
              <strong>Tipo:</strong> {poke.types.join(", ")}
            </p>
            <p>
              <strong>Habilidades:</strong> {poke.abilities.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
