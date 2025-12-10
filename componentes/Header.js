"use client";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1db954] text-black px-5 py-2 flex justify-between items-center z-[1000]">
      <div className="logo">
        <p className="m-0 font-bold text-[20px]">SPOTYFY</p>
      </div>

      {/* Si en el futuro quieres un menú, puedes añadirlo aquí */}
      {/* 
      <ul className="flex gap-5 list-none m-0 p-0">
        <li>
          <button className="px-4 py-2 rounded-lg bg-[#189945] text-gray-300 font-medium hover:bg-[#2e3a33] hover:scale-105 transition">
            Inicio
          </button>
        </li>
      </ul>
      */}
    </nav>
  );
};

export default Header;
