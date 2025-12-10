"use client";
import { useState } from "react";

const PlaylistDisplay = ({
  playlist,
  setPlaylist,
  songSearch,
  setSongSearch,
  songResults,
  buscarCancionesPlaylist,
  añadirCancionManual
}) => {
  const [mostrar, setMostrar] = useState(false);

  const eliminarcancion = (track) => {
    setPlaylist(playlist.filter(a => a.id !== track.id));
  };

  return (
    <div className="bg-[#121212] rounded-2xl p-6 text-[#f5f5f5] flex flex-col gap-5">

      {/* 🔍 BUSCADOR */}
      <div className="bg-[#181818] border-2 border-white/5 rounded-xl p-4">
        <h3 className="text-base font-semibold mb-3">Añadir canciones manualmente</h3>

        <input
          type="text"
          placeholder="Buscar canción..."
          value={songSearch}
          onChange={(e) => {
            setSongSearch(e.target.value);
            buscarCancionesPlaylist(e.target.value);
          }}
          className="w-full p-3 rounded-xl bg-[#181818] text-white border-2 border-transparent 
                     focus:border-[#1db954] focus:ring-1 focus:ring-[#1db954]/40 
                     text-sm placeholder:text-white/50 outline-none"
        />

        {/* Resultados */}
        {songResults?.length > 0 && (
          <div className="mt-3 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">

            {songResults.map(track => (
              <div
                key={track.id}
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition 
                           p-2 rounded-lg mb-2"
              >
                <img
                  src={track.album.images[0]?.url}
                  width="60"
                  className="rounded-lg"
                />

                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate">{track.name}</p>
                  <p className="text-xs text-white/70 truncate">{track.artists[0]?.name}</p>
                </div>

                <button
                  onClick={() => añadirCancionManual(track)}
                  className="px-3 py-1 bg-[#1db954] hover:bg-[#1ed760] text-[#181818] 
                             rounded-full text-xs font-bold transition transform hover:scale-105"
                >
                  + Añadir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold">Playlist Generada</h2>

      {/* Botón mostrar/ocultar */}
      <button
        className="self-start px-4 py-2 rounded-full border border-white/20 text-sm 
                   hover:bg-white/10 hover:border-white/40 transition"
        onClick={() => setMostrar(!mostrar)}
      >
        {mostrar ? "Ocultar Playlist" : "Mostrar Playlist"}
      </button>

      {/* Lista */}
      {mostrar && (
        <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto 
                        scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent mt-2">

          {playlist.length === 0 ? (
            <p>No hay canciones aún.</p>
          ) : (
            playlist.map(track => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-3 bg-[#181818] border border-white/5 
                           rounded-xl hover:bg-[#1d222c] transition hover:-translate-y-[1px] 
                           hover:shadow-md shadow-black/30"
              >
                <img
                  src={track.album?.images?.[0]?.url || "/no-image.png"}
                  width="90"
                  className="rounded-xl"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{track.name}</p>
                  <p className="text-xs text-white/70 truncate">
                    {track.artists?.[0]?.name || "Artista desconocido"}
                  </p>
                </div>

                <button
                  onClick={() => eliminarcancion(track)}
                  className="px-3 py-1 bg-[#e64949] hover:bg-[#ff5c5c] text-white rounded-full 
                             text-xs font-bold tracking-wide transition transform 
                             hover:-translate-y-[1px] hover:shadow-md shadow-[#e64949]/40"
                >
                  ELIMINAR
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PlaylistDisplay;
