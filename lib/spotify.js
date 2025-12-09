// lib/spotify.js

export async function generatePlaylist(preferences, tokken) {
  const { artists, genres, decades, popularity } = preferences;
  const token = tokken; // token que le pasas desde el componente

  let allTracks = [];

  // 1. Obtener top tracks de artistas seleccionados
  for (const artist of artists) {
    // por si en artists tienes IDs directamente y no objetos
    const artistId = typeof artist === "string" ? artist : artist.id;

    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;

    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Si falla la request, vemos el error bruto
    if (!resp.ok) {
      const errorBody = await resp.text();
      console.error("❌ Error top-tracks:", {
        status: resp.status,
        statusText: resp.statusText,
        url,
        artist,
        body: errorBody,
      });
      continue; // pasamos al siguiente artista
    }

    const data = await resp.json();

    // Si el formato no es el esperado, también lo logueamos
    if (!Array.isArray(data.tracks)) {
      console.error("⚠️ Formato inesperado top-tracks:", {
        url,
        artist,
        data,
      });
      continue;
    }

    allTracks.push(...data.tracks);
  }

  // 2. Buscar por géneros
  for (const genre of genres) {
    const url = `https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=20`;

    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resp.ok) {
      const errorBody = await resp.text();
      console.error("❌ Error búsqueda por género:", {
        status: resp.status,
        statusText: resp.statusText,
        url,
        genre,
        body: errorBody,
      });
      continue;
    }

    const data = await resp.json();

    if (!data.tracks || !Array.isArray(data.tracks.items)) {
      console.error("⚠️ Formato inesperado búsqueda por género:", {
        url,
        genre,
        data,
      });
      continue;
    }

    allTracks.push(...data.tracks.items);
  }

  // 3. Filtrar por década
  if (decades.length > 0) {
    allTracks = allTracks.filter((track) => {
      const year = new Date(track.album.release_date).getFullYear();
      return decades.some((decade) => {
        const decadeStart = parseInt(decade);
        return year >= decadeStart && year < decadeStart + 10;
      });
    });
  }

  // 4. Filtrar por popularidad
  if (Array.isArray(popularity) && popularity.length === 2) {
    const [min, max] = popularity;
    allTracks = allTracks.filter(
      (track) => track.popularity >= min && track.popularity <= max
    );
  }

  // 5. Eliminar duplicados y limitar a 30 canciones
  const uniqueTracks = Array.from(
    new Map(allTracks.map((track) => [track.id, track])).values()
  ).slice(0, 30);

  return uniqueTracks;
}
