'use client';
import { useState } from "react";

const Decades = [
  "1920", "1930", "1940", "1950", "1960", "1970",
  "1980", "1990", "2000", "2010", "2020"
];

export default function DecadesWidget({ selectedDecades, setSelectedDecades }) {
  const toggleDecade = (decade) => {
    if (selectedDecades.includes(decade)) {
      setSelectedDecades(selectedDecades.filter(d => d !== decade));
    } else {
      setSelectedDecades([...selectedDecades, decade]);
    }
  };

  return (
    <div className="bg-[#121212] p-5 rounded-xl box-border">
      <h2 className="text-[#1db954] text-lg mb-4">Filtrar por década ⏳</h2>

      <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#1db954] scrollbar-track-transparent">
        {Decades.map((d) => (
          <button
            key={d}
            onClick={() => toggleDecade(d)}
            className={`
              flex-shrink-0 px-5 py-3 rounded-xl text-white bg-[#181818]
              cursor-pointer transition transform
              hover:bg-[#232323] hover:scale-105
              ${selectedDecades.includes(d)
                ? "bg-[#1db95433] border border-[#1db954]"
                : ""
              }
            `}
          >
            {d}s
          </button>
        ))}
      </div>
    </div>
  );
}
