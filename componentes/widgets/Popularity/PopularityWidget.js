import { useState } from "react";

const PopularityRanges = [
  { id: "mainstream", label: "Mainstream", range: [80, 100] },
  { id: "popular", label: "Popular", range: [50, 80] },
  { id: "underground", label: "Underground", range: [0, 50] },
];

export default function PopularityWidget({ selectedPopularity, setSelectedPopularity }) {
  const [popularityValue, setPopularityValue] = useState(50);

  const togglePopularity = (rangeId) => {
    setSelectedPopularity([rangeId]);
    const range = PopularityRanges.find((r) => r.id === rangeId).range;
    setPopularityValue(Math.floor((range[0] + range[1]) / 2));
  };

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setPopularityValue(value);
    const matchedRange = PopularityRanges.find((r) => value >= r.range[0] && value <= r.range[1]);
    if (matchedRange) {
      setSelectedPopularity([matchedRange.id]);
    }
  };

  return (
    <div className="bg-[#121212] p-6 rounded-xl text-white flex flex-col gap-5 shadow-md border border-white/5">
      <h2 className="text-xl font-semibold text-[#1db954]">Filtrar por Popularidad 🔥</h2>

      <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
        {PopularityRanges.map((p) => (
          <button
            key={p.id}
            onClick={() => togglePopularity(p.id)}
            className={`px-4 py-3 rounded-xl whitespace-nowrap transition-transform duration-150 flex-shrink-0 border
              ${selectedPopularity.includes(p.id)
                ? "bg-[#1db95433] border-[#1db954]"
                : "bg-[#181818] border-transparent hover:bg-[#232323]"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Popularidad: {popularityValue}</label>

        <input
          type="range"
          min="0"
          max="100"
          value={popularityValue}
          onChange={handleSliderChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#181818]"
          style={{
            background: `linear-gradient(to right, #1db954 0%, #1db954 ${popularityValue}%, #181818 ${popularityValue}%, #181818 100%)`,
          }}
        />
      </div>
    </div>
  );
}
