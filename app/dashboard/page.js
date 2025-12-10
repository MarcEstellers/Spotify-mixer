"use client";

import { useEffect, useState } from "react";
import Header from "@/componentes/Header";
import ArtistsWidgets from "@/componentes/widgets/Artists/ArtistsWidget";
import TraksWidget from "@/componentes/widgets/Traks/TraksWidget";
import GenresWidget from "@/componentes/widgets/Genre/GenreWidget";
import DecadesWidget from "@/componentes/widgets/Decades/DecadesWidget";
import PopularityWidget from "@/componentes/widgets/Popularity/PopularityWidget";
import { generatePlaylist } from "@/lib/spotify";
import PlaylistDisplay from "@/componentes/widgets/Playlist/Playlist";

export default function DashboardPage() {
  const [accessToken, setAccessToken] = useState(null);
  const [favArt, setFavArt] = useState([]);
  const [favTrak, setFavTrak] = useState([]);
  const [filtArt, setFiltArtistas] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedPopularity, setSelectedPopularity] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const [songSearch, setSongSearch] = useState("");
  const [songResults, setSongResults] = useState([]);

  useEffect(() => {
    async function obtenerToken() {
      const refreshToken = localStorage.getItem("spotify_refresh_token");
      if (!refreshToken) return;

      const resp = await fetch("/api/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await resp.json();
      if (!resp.ok) return;

      setAccessToken(data.access_token);
    }

    obtenerToken();
  }, []);

  if (!accessToken) {
    return <p className="text-center text-white mt-10">Cargando Spotify...</p>;
  }

  const generacionPlaylist = async () => {
    try {
      const preferences = {
        artists: filtArt,
        genres: selectedGenres,
        decades: selectedDecades,
        popularity: selectedPopularity,
      };

      let lista = await generatePlaylist(preferences, accessToken);
      setPlaylist(lista);
    } catch (err) {
      console.error("Error generando playlist:", err);
    }
  };

  const buscarCancionesPlaylist = async (texto) => {
    if (!texto.trim()) {
      setSongResults([]);
      return;
    }

    const res = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(texto)}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await res.json();
    setSongResults(data.tracks?.items || []);
  };

  const añadirCancionManual = (track) => {
    const yaEsta = playlist.some((p) => p.id === track.id);
    if (yaEsta) return;

    setPlaylist([...playlist, track]);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex flex-1 pt-16"> {/* separa fall del header fixed */}
        {/* LEFT PANEL */}
        <div className="w-2/3 p-4 flex flex-col gap-4 overflow-y-auto">
          <ArtistsWidgets
            accessToken={accessToken}
            favArt={favArt}
            SetFavArt={setFavArt}
            filtArt={filtArt}
            setFiltArtistas={setFiltArtistas}
          />

          <TraksWidget
            accessToken={accessToken}
            favTrak={favTrak}
            SetFavTrak={setFavTrak}
          />

          <GenresWidget
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />

          <DecadesWidget
            selectedDecades={selectedDecades}
            setSelectedDecades={setSelectedDecades}
          />

          <PopularityWidget
            selectedPopularity={selectedPopularity}
            setSelectedPopularity={setSelectedPopularity}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/3 p-4">
          <div className="flex flex-col h-full bg-neutral-900 rounded-xl p-4 gap-4">
            <button
              onClick={generacionPlaylist}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl py-3 transition-all"
            >
              Generar Playlist
            </button>

            <div className="flex-1 overflow-y-auto">
              <PlaylistDisplay
                playlist={playlist}
                setPlaylist={setPlaylist}
                songSearch={songSearch}
                setSongSearch={setSongSearch}
                songResults={songResults}
                buscarCancionesPlaylist={buscarCancionesPlaylist}
                añadirCancionManual={añadirCancionManual}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
