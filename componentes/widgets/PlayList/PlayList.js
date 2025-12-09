'use client';

import { useState } from "react";
import { generatePlaylist } from "@/lib/spotify";

export default function PlaylistWidget({
  favArt,
  favTrak,
  filtArt,
  filtTrak,
  selectedGenres,
  selectedDecades,
  selectedPopularity
}) {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlaylist = async () => {
    setLoading(true);

    // Prioridad: géneros > artistas > décadas > popularidad
    const preferences = {
      genres: selectedGenres.length > 0 ? selectedGenres : [],
      artists: selectedGenres.length === 0 && filtArt.length > 0 ? filtArt : [],
      decades: selectedGenres.length === 0 && filtArt.length === 0 && selectedDecades.length > 0 ? selectedDecades : [],
      popularity: selectedGenres.length === 0 && filtArt.length === 0 && selectedDecades.length === 0 && selectedPopularity.length > 0 ? selectedPopularity : null
    };

    const tracks = await generatePlaylist(preferences);
    setPlaylist(tracks);
    setLoading(false);
  };

  return (
    <div className="playlist-widget">
      <h2>Generar Playlist 🎶</h2>
      <button onClick={handleGeneratePlaylist} className="generate-btn">
        {loading ? "Generando..." : "Generar Playlist"}
      </button>

      <ul className="playlist-list">
        {playlist.map(track => (
          <li key={track.id} className="playlist-item">
            <img src={track.album.images[0]?.url} alt={track.name} />
            <span>{track.name}</span>
            <span style={{ fontSize: "12px", color: "#b3b3b3" }}>
              {track.artists.map(a => a.name).join(", ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
