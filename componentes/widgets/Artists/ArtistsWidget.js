'use client';
import { useEffect, useState } from "react";
import "./ArtistsWidget.css";

export default function ArtistsWidgets({ accessToken, favArt, SetFavArt, filtArt, setFiltArtistas }) {
  const [texto, setTexto] = useState("");
  const [artistas, setArtistas] = useState([]);
  const [error, setError] = useState("");



 useEffect( () => {
        localStorage.setItem("favoritos Artistas", JSON.stringify(favArt));
        console.log({favArt})
    }, [favArt]);   //cada vez que modifico favoritas lo añado al local storage


  // Función para añadir / quitar favoritos
  const toggleFavorito = (artist) => {
    // ¿Ya está en favoritos?
    const yaEsta = favArt.some((fav) => fav.id === artist.id);

    if (yaEsta) {
      // Lo quitamos
      SetFavArt(favArt.filter((fav) => fav.id !== artist.id));
    } else {
      // Lo añadimos
      SetFavArt([...favArt, artist]);
    }
  };


 const toggleFiltroArtistas = (artista) => {
  if (filtArt.includes(artista.id)) {
    setFiltArtistas(filtArt.filter(id => id !== artista.id));
  } else {
    setFiltArtistas([...filtArt, artista.id]);
  }
};


  // Debouncing
  useEffect(() => {
    if (!texto.trim()) {
      setArtistas([]);
      setError("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const url = `https://api.spotify.com/v1/search?type=artist&limit=5&q=${encodeURIComponent(
          texto
        )}`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await res.json();

        if (!res.ok) {
          setError("Error buscando artistas.");
          setArtistas([]);
          return;
        }

        setError("");
        setArtistas(data.artists.items || []);
      } catch (err) {
        setError("Error en la petición.");
        setArtistas([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [texto, accessToken]);

  return (
    <div className="widget-container">
      <h1>Buscar artistas</h1>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar artista"
      />

      {error && <p>{error}</p>}

      <ul>
        {artistas.map((a) => {
          const esFavorito = favArt.some((fav) => fav.id === a.id);

          return (
            <button
              key={a.id}
              className={`filtoArt ${filtArt.includes(a.id) ? "selectedArt" : ""}`}
              onClick={() => toggleFiltroArtistas(a)}
            >
              {a.images[0] && (
                <img src={a.images[0].url} alt={a.name} />
              )}

              <span>{a.name}</span>

              {/* Botón de favorito SIN <button> dentro del botón padre */}
              <button
                className={`fav-btn ${esFavorito ? "fav-btn--active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); // evita activar el botón del artista
                  toggleFavorito(a);
                }}
              >
                {esFavorito ? "★" : "☆"}
              </button>
            </button>
          );
        })}
      </ul>
    </div>
  );
}
