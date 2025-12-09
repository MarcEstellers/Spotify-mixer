'use client';
import { useState } from "react";
import './DecadesWidget.css';

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
    <div className="decades-widget">
      <h2>Filtrar por década ⏳</h2>

      <div className="decades-container">
        {Decades.map((d) => (
          <button
            key={d}
            className={`decade-btn ${selectedDecades.includes(d) ? "selected" : ""}`}
            onClick={() => toggleDecade(d)}
          >
            {d}s
          </button>
        ))}
      </div>
    </div>
  );
}
