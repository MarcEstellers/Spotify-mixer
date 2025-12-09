'use client';

import { useEffect, useState } from "react";
import Header from "@/componentes/Header";
import ArtistsWidgets from "@/componentes/widgets/Artists/ArtistsWidget";
import TraksWidget from "@/componentes/widgets/Traks/TraksWidget";
import GenresWidget from "@/componentes/widgets/Genre/GenreWidget";

export default function DashboardPage() {
  const [accessToken, setAccessToken] = useState(null);
  const [favArt, setFavArt] = useState([]);
  const [favTrak, setFavTrak] = useState([]);
  const [filtArt, setFiltArtistas] = useState([]);
  const [filtTrak, setFiltTrak] = useState([]);


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

  return (
    <div>
      <Header/>
      <ArtistsWidgets accessToken={accessToken} favArt={favArt} SetFavArt={setFavArt} filtArt={filtArt} setFiltArtistas={setFiltArtistas}  /> 
      <TraksWidget  accessToken={accessToken} favTrak={favTrak} SetFavTrak={setFavTrak} filtTrak={filtTrak} setFiltTrak={setFiltTrak}/>
      <GenresWidget/>
    </div>
  );
}
