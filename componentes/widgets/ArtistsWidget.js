'use client';
import { useEffect, useState } from "react";

export default function ArtistsWidgets({ accessToken }) {
  const [texto, setTexto] = useState("");
  const [artistas, setArtistas] = useState([]);
  const [error, setError] = useState("");

  // 🔁 Efecto con debouncing
  useEffect(() => {
    // si el input está vacío, limpiamos resultados y no buscamos
    if (!texto.trim()) {
      setArtistas([]);
      setError("");
      return;
    }

    // timeout de debounce (medio segundo)
    const timeoutId = setTimeout(async () => {
      try {
        const url = `https://api.spotify.com/v1/search?type=artist&limit=5&q=${encodeURIComponent(texto)}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
        console.error(err);
        setError("Error en la petición.");
        setArtistas([]);
      }
    }, 500); // ⏱️ aquí ajustas el tiempo de debounce (ms)

    // cleanup: si `texto` cambia antes de que pase el tiempo, cancelamos este timeout
    return () => clearTimeout(timeoutId);
  }, [texto, accessToken]);

  return (
    <div>
      <h1>Buscar artistas</h1>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Buscar artista"
      />

      {error && <p>{error}</p>}

      <ul>
        {artistas.map((a) => (
          <li key={a.id}>
            {a.name}
            {a.images[0] && (
              <img
                src={a.images[0].url}
                alt={a.name}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
