'use client';
import { useState, useEffect } from "react";

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

export default function GenresWidget({ selectedGenres, setSelectedGenres }) {
  const [search, setSearch] = useState("");
  const [filteredGenres, setFilteredGenres] = useState(Generos);

  // Debounce filter
  useEffect(() => {
    if (!search.trim()) {
      setFilteredGenres(Generos);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = Generos.filter((g) =>
        g.toLowerCase().includes(search.toLowerCase())
      );
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
    <div className="bg-[#121212] p-5 rounded-xl box-border">
      <h2 className="text-[#1db954] text-lg mb-4">Filtrar por género 🎹</h2>

      <input
        type="text"
        placeholder="Buscar género..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-4 rounded-xl border-2 border-[#1db954] bg-[#181818] text-white outline-none"
      />

      <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#1db954] scrollbar-track-transparent">
        {filteredGenres.map((g) => (
          <button
            key={g}
            onClick={() => toggleGenre(g)}
            className={`
              flex-shrink-0 px-5 py-3 rounded-xl text-white bg-[#181818]
              cursor-pointer transition transform
              hover:bg-[#232323] hover:scale-105
              ${selectedGenres.includes(g)
                ? "bg-[#1db95433] border border-[#1db954]"
                : ""
              }
            `}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}
