"use client";
import { useState } from "react";



const PlaylistDisplay = ({ playlist,setPlaylist}) => {
  const [mostrar, setMostrar] = useState(false);
  //añadir al localstorage
  
    const eliminarcancion =(track)=>{
        let auxeliminar=[...playlist]
        auxeliminar=auxeliminar.filter(a=>a.id!== track.id)
        setPlaylist(auxeliminar)
    }
  
  return (
       <div className='playlistDisplay'>
        <h2>Playlist Generada</h2>
        <button className='botonPlaylist' onClick={() => setMostrar(!mostrar)}>
        {mostrar ? "Ocultar Playlist" : "Mostrar Playlist"}
        </button>
        {mostrar && (
            <div className='listaPlaylist'>
                {playlist.length === 0 ? (
                    <p>No hay canciones aún.</p>
                ) : (playlist.map(track => (
                        <div key={track.id} className='trackItem'>
                        <img src={track.album?.images?.[0]?.url || "/no-image.png"}width="90"/>

               <div className='info'>
               <p className='titulo'>{track.name}</p>
               <p className='artista'>
                {track.artists?.[0]?.name || "Artista desconocido"}
                    </p>
                    </div>
                <button className='botoneliminar' onClick={() => eliminarcancion(track)}> ELIMINAR</button>
                </div>
                ))
            )}
            </div>
        )}
        </div>

    );
};

export default PlaylistDisplay;