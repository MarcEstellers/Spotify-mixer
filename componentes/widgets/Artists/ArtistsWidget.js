'use client';
import { useEffect, useState } from "react";

export default function ArtistsWidgets({ accessToken, favArt, SetFavArt, filtArt, setFiltArtistas }) {
  const [texto, setTexto] = useState("");
  const [artistas, setArtistas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("favoritos Artistas", JSON.stringify(favArt));
    console.log({ favArt });
  }, [favArt]);

  const toggleFavorito = (artist) => {
    const yaEsta = favArt.some((fav) => fav.id === artist.id);
    if (yaEsta) {
      SetFavArt(favArt.filter((fav) => fav.id !== artist.id));
    } else {
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

  // Debounce
  useEffect(() => {
    if (!texto.trim()) {
      setArtistas([]);
      setError("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const url = `https://api.spotify.com/v1/search?type=artist&limit=5&q=${encodeURIComponent(texto)}`;

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
    <div className="bg-[#121212] p-5 rounded-xl text-white w-full max-w-full box-border font-sans">
      <h2 className="text-[#1db954] text-lg mb-4">Buscar artistas 🎤</h2>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar artista"
        className="w-full p-3 border-2 border-[#1db954] rounded-xl bg-[#181818] text-white outline-none placeholder:text-[#b3b3b3] mb-3"
      />

      {error && <p className="text-yellow-300 mt-2">{error}</p>}

      <ul className="list-none mt-4 p-0">
        {artistas.map((a) => {
          const esFavorito = favArt.some((fav) => fav.id === a.id);

          return (
            <button
              key={a.id}
              onClick={() => toggleFiltroArtistas(a)}
              className={`flex items-center gap-3 w-full p-3 mb-3 bg-[#181818] rounded-xl cursor-pointer transition
                ${
                  filtArt.includes(a.id)
                    ? "bg-[#1db95433] border border-[#1db954]"
                    : "hover:bg-[#232323]"
                }`}
            >
              {a.images[0] && (
                <img
                  src={a.images[0].url}
                  alt={a.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}

              <span className="text-white text-base font-medium">{a.name}</span>

              <span
                className={`ml-auto cursor-pointer text-2xl ${
                  esFavorito ? "text-yellow-400 scale-110" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorito(a);
                }}
              >
                {esFavorito ? "★" : "☆"}
              </span>
            </button>
          );
        })}
      </ul>
    </div>
  );
}
