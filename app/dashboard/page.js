'use client';

import { useEffect, useState } from "react";
import Header from "@/componentes/Header";
import ArtistsWidgets from "@/componentes/widgets/ArtistsWidget";

export default function DashboardPage() {
  const [accessToken, setAccessToken] = useState(null);

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
      <ArtistsWidgets accessToken={accessToken} /> 
    </div>
  );
}
