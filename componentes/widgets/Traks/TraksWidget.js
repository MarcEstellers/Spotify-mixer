'use client';
import { useEffect, useState } from "react";
import "./TraksWidget.css";

export default function TraksWidget({ accessToken, favTrak , SetFavTrak, filtTrak, setFiltTrak }) {
  const [texto, setTexto] = useState("");
  const [trak, setTrak] = useState([]);
  const [error, setError] = useState("");
 useEffect( () => {
        localStorage.setItem("favoritos canciones", JSON.stringify(favTrak));
        console.log({favTrak})
    }, [favTrak]);   //cada vez que modifico favoritas lo añado al local storage

  // Función para añadir / quitar favoritos
  const toggleFavorito = (cancion) => {
    const yaEsta = favTrak.some((fav) => fav.id === cancion.id);

    if (yaEsta) {
      // Lo quitamos
      SetFavTrak(favTrak.filter((fav) => fav.id !== cancion.id));
    } else {
      // Lo añadimos
      SetFavTrak([...favTrak, cancion]);
    }
  };


  const toggleFiltroTraks = (trak) => {
  if (filtTrak.includes(trak.id)) {
    setFiltTrak(filtTrak.filter(id => id !== trak.id));
  } else {
    setFiltTrak([...filtTrak, trak.id]);
  }
};

  // Debouncing
  useEffect(() => {
    if (!texto.trim()) {
      setTrak([]);
      setError("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const url = `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(
          texto
        )}`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await res.json();

        if (!res.ok) {
          setError("Error buscando canciones.");
          setTrak([]);
          return;
        }

        setError("");
        setTrak(data.tracks.items || []);
      } catch (err) {
        setError("Error en la petición.");
        setTrak([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [texto, accessToken]);

  return (
    <div className="tracks-widget">
      <h2 className="tracks-title">Buscar canciones 🎧 </h2>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar canción"
        className="tracks-search-input"
      />

      {error && <p className="tracks-error">{error}</p>}

      <ul className="tracks-list">
        {trak.map((c) => {
          const esFavorito = favTrak.some((fav) => fav.id === c.id);
          const cover = c.album?.images?.[0]?.url;

          return (
            <button
              key={c.id}
              className={`tracks-item ${filtTrak.includes(c.id) ? "selectedTrack" : ""}`}
              onClick={() => toggleFiltroTraks(c)}
            >
              {cover && (
                <img
                  src={cover}
                  alt={c.name}
                  className="tracks-cover"
                />
              )}

              <span className="tracks-name">{c.name}</span>

              {/* Botón de favorito sin interferir en la selección */}
              <span
                type="button"
                className={`tracks-fav-btn ${esFavorito ? "tracks-fav-btn--active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); // evita seleccionar el track
                  toggleFavorito(c);
                }}
              >
                {esFavorito ? "❤" : "♡"}
              </span>
            </button>
          );
        })}
      </ul>
    </div>
  );
}
