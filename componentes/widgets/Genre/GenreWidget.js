'use client';
import { useState, useEffect } from "react";
import './GenreWidget.css'

const Generos = [
  'acoustic','afrobeat','alt-rock','alternative','ambient','anime','black-metal','bluegrass','blues','bossanova',
  'brazil','breakbeat','british','cantopop','chicago-house','children','chill','classical','club','comedy','country',
  'dance','dancehall','death-metal','deep-house','detroit-techno','disco','disney','drum-and-bass','dub','dubstep',
  'edm','electro','electronic','emo','folk','forro','french','funk','garage','german','gospel','goth','grindcore',
  'groove','grunge','guitar','happy','hard-rock','hardcore','hardstyle','heavy-metal','hip-hop','house','idm',
  'indian','indie','indie-pop','industrial','iranian','j-dance','j-idol','j-pop','j-rock','jazz','k-pop','kids',
  'latin','latino','malay','mandopop','metal','metal-misc','metalcore','minimal-techno','movies','mpb','new-age',
  'new-release','opera','pagode','party','philippines-opm','piano','pop','pop-film','post-dubstep','power-pop',
  'progressive-house','psych-rock','punk','punk-rock','r-n-b','rainy-day','reggae','reggaeton','road-trip','rock',
  'rock-n-roll','rockabilly','romance','sad','salsa','samba','sertanejo','show-tunes','singer-songwriter','ska',
  'sleep','songwriter','soul','soundtracks','spanish','study','summer','swedish','synth-pop','tango','techno',
  'trance','trip-hop','turkish','work-out','world-music'
];

export default function GenresWidget() {
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);



    const timeoutId = setTimeout(() => {
      const filtered = Generos
        .filter((g) => g.toLowerCase().includes(encodeURIComponent(search.toLowerCase())))
        .slice(0, 5); // max 5 resultados
      setFilteredGenres(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="genres-widget">
      <h2>Filtrar por género</h2>
      <input
        type="text"
        placeholder="Buscar género..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="genres-container">
        {filteredGenres.map((g) => (
          <button
            key={g}
            className={`genre-btn ${selectedGenres.includes(g) ? "selected" : ""}`}
            onClick={() => toggleGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}
