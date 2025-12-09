"use client";
import { useState } from "react";
import './Playlist.css'

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
    let auxeliminar = playlist.filter(a => a.id !== track.id);
    setPlaylist(auxeliminar);
  };

  return (
    <div className='playlistDisplay'>

      {/* 🔍 BUSCADOR PARA AÑADIR CANCIONES */}
      <div className="playlistAddBox">
        <h3>Añadir canciones manualmente</h3>
        <input
          type="text"
          placeholder="Buscar canción..."
          value={songSearch}
          onChange={(e) => {
            setSongSearch(e.target.value);
            buscarCancionesPlaylist(e.target.value);
          }}
          className="playlistSearchInput"
        />

        {songResults?.length > 0 && (
          <div className="playlistResultsBox">
            {songResults.map(track => (
              <div key={track.id} className="playlistResultItem">
                <img src={track.album.images[0]?.url} width="60" />

                <div>
                  <p>{track.name}</p>
                  <p>{track.artists[0]?.name}</p>
                </div>

                <button onClick={() => añadirCancionManual(track)}>
                  + Añadir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <h2>Playlist Generada</h2>
      <button className='botonPlaylist' onClick={() => setMostrar(!mostrar)}>
        {mostrar ? "Ocultar Playlist" : "Mostrar Playlist"}
      </button>

      {mostrar && (
        <div className='listaPlaylist'>
          {playlist.length === 0 ? (
            <p>No hay canciones aún.</p>
          ) : (
            playlist.map(track => (
              <div key={track.id} className='trackItem'>
                <img src={track.album?.images?.[0]?.url || "/no-image.png"} width="90" />

                <div className='info'>
                  <p className='titulo'>{track.name}</p>
                  <p className='artista'>{track.artists?.[0]?.name || "Artista desconocido"}</p>
                </div>

                <button className='botoneliminar' onClick={() => eliminarcancion(track)}>
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