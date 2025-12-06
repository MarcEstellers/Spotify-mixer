'use client';
import { useState } from "react";

export default function ArtistsWidgets({ accessToken }) { // 👈 LO RECIBES AQUÍ
  const [texto, setTexto] = useState("");
  const [artistas, setArtistas] = useState([]);

  const buscar = async (e) => {
    e.preventDefault();

    const url = `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(texto)}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 👈 USAS EL TOKEN QUE VINO DEL DASHBOARD
      },
    });

    const data = await res.json();
    setArtistas(data.artists.items);
  };

  return (
    <div>
      <form onSubmit={buscar}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar artista"
        />
        <button>Buscar</button>
      </form>

      <ul>
        {artistas.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
    </div>
  );
}
