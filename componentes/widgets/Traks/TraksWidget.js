"use client";
import { useEffect, useState } from "react";

export default function TraksWidget({ accessToken, favTrak, SetFavTrak }) {
  const [texto, setTexto] = useState("");
  const [trak, setTrak] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("favoritos canciones", JSON.stringify(favTrak));
  }, [favTrak]);

  const toggleFavorito = (cancion) => {
    const yaEsta = favTrak.some((fav) => fav.id === cancion.id);
    if (yaEsta) SetFavTrak(favTrak.filter((fav) => fav.id !== cancion.id));
    else SetFavTrak([...favTrak, cancion]);
  };

  useEffect(() => {
    if (!texto.trim()) {
      setTrak([]);
      setError("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const url = `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(texto)}`;
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
    <div className="bg-[#121212] p-5 rounded-xl w-full max-w-full box-border text-white">
      <h2 className="mb-4 text-[#1db954] text-lg font-semibold">Buscar canciones</h2>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar canción"
        className="w-full p-3 border-2 border-[#1db954] rounded-xl bg-[#181818] text-white outline-none mb-3 placeholder:text-gray-400"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ul className="mt-4 space-y-3">
        {trak.map((c) => {
          const esFavorito = favTrak.some((fav) => fav.id === c.id);
          const cover = c.album?.images?.[0]?.url;

          return (
            <li
              key={c.id}
              className="flex items-center gap-3 w-full p-4 rounded-xl bg-[#181818] hover:bg-[#232323] hover:scale-[1.01] transition cursor-pointer"
            >
              {cover && (
                <img
                  src={cover}
                  alt={c.name}
                  className="w-[50px] h-[50px] object-cover rounded-lg flex-shrink-0"
                />
              )}

              <span className="flex-1 text-white text-sm font-medium truncate">{c.name}</span>

              <button
                type="button"
                className={`ml-auto text-2xl ${esFavorito ? "text-red-600" : "text-white"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorito(c);
                }}
              >
                {esFavorito ? "❤" : "♡"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
