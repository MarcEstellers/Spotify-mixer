'use client';
import { useState } from "react";
import './PopularityWidget.css';

const PopularityRanges = [
  { id: 'mainstream', label: 'Mainstream', range: [80, 100] },
  { id: 'popular', label: 'Popular', range: [50, 80] },
  { id: 'underground', label: 'Underground', range: [0, 50] }
];

export default function PopularityWidget({ selectedPopularity, setSelectedPopularity }) {
  const [popularityValue, setPopularityValue] = useState(50);

    const togglePopularity = (rangeId) => {
    setSelectedPopularity([rangeId]); // reemplaza todo por solo la opción clickeada
    const range = PopularityRanges.find(r => r.id === rangeId).range;
    // Ajustar slider al rango medio de la opción
    setPopularityValue(Math.floor((range[0] + range[1]) / 2));
    };


  const handleSliderChange = (e) => {
  const value = Number(e.target.value);
  setPopularityValue(value);

  // Encontrar rango correspondiente
  const matchedRange = PopularityRanges.find(r => value >= r.range[0] && value <= r.range[1]);
  if (matchedRange) {
    setSelectedPopularity([matchedRange.id]); // solo una opción
  }
};


  // Calcular el porcentaje para el fondo
  const sliderBackground = {
    background: `linear-gradient(to right, #1db954 0%, #1db954 ${popularityValue}%, #181818 ${popularityValue}%, #181818 100%)`
  };

  return (
    <div className="popularity-widget">
      <h2>Filtrar por Popularidad 🔥</h2>

      <div className="popularity-container">
        {PopularityRanges.map((p) => (
          <button
            key={p.id}
            className={`popularity-btn ${selectedPopularity.includes(p.id) ? "selected" : ""}`}
            onClick={() => togglePopularity(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="popularity-slider">
        <label htmlFor="popularityRange">Popularidad: {popularityValue}</label>
        <input
          type="range"
          id="popularityRange"
          min="0"
          max="100"
          value={popularityValue}
          onChange={handleSliderChange}
          style={sliderBackground}
        />
      </div>
    </div>
  );
}
