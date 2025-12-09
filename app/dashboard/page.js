'use client';

import { useEffect, useState } from "react";
import Header from "@/componentes/Header";
import ArtistsWidgets from "@/componentes/widgets/Artists/ArtistsWidget";
import TraksWidget from "@/componentes/widgets/Traks/TraksWidget";
import GenresWidget from "@/componentes/widgets/Genre/GenreWidget";
import DecadesWidget from "@/componentes/widgets/Decades/DecadesWidget";
import PopularityWidget from "@/componentes/widgets/Popularity/PopularityWidget";
import { generatePlaylist } from "@/lib/spotify";
import PlaylistDisplay from "@/componentes/widgets/Playlist/Playlist";
import './page.css';

export default function DashboardPage() {
  const [accessToken, setAccessToken] = useState(null);
  const [favArt, setFavArt] = useState([]);
  const [favTrak, setFavTrak] = useState([]);
  const [filtArt, setFiltArtistas] = useState([]);
  const [filtTrak, setFiltTrak] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [selectedPopularity, setSelectedPopularity] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  

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
    return <p>Cargando Spotify...</p>;
  }

  const generacionPlaylist = async () => {
    try {
    
      const preferences = {
        artists: filtArt,
        genres: selectedGenres,
        decades: selectedDecades,
        popularity: selectedPopularity,
      };

      // Llamamos a la función de lib/spotify.js
      let lista = await generatePlaylist(preferences, accessToken);


      // Guardamos en estado
      setPlaylist(lista);
      
    } catch (err) {
      console.error("Error generando playlist:", err);
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">

        <div className="dashboard-left">
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
            filtTrak={filtTrak}
            setFiltTrak={setFiltTrak}
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

        <div className="dashboard-right">
          <div className="playlist_generator">
            <button onClick={generacionPlaylist} className="botonGenerar"> Generar Playlist</button>
            <PlaylistDisplay playlist={playlist} setPlaylist={setPlaylist}/>
              </div>
          </div>
        </div>

      </div>
  );
}