'use client';

import { useEffect, useState } from "react";
import Header from "@/componentes/Header";
import ArtistsWidgets from "@/componentes/widgets/Artists/ArtistsWidget";
import TraksWidget from "@/componentes/widgets/Traks/TraksWidget";

export default function DashboardPage() {
  const [accessToken, setAccessToken] = useState(null);
  const [favArt, setFavArt] = useState([]);
  const [favTrak, setFavTrak] = useState([]);

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
      <ArtistsWidgets accessToken={accessToken} favArt={favArt} SetFavArt={setFavArt} /> 
      <TraksWidget  accessToken={accessToken} favTrak={favTrak} SetFavTrak={setFavTrak}/>
    </div>
  );
}
