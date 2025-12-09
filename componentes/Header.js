import { Headerlinks } from "./data";
import './Header.css';



const Header = () => {

  return (
    <nav className= "header">
      <div className= "logo">
        <p>SPOTYFY</p>
      </div>

            <ul className="menu">
        {Headerlinks.map((item) => (
          <li key={item.id}>
            <button
              className="menu-btn"
              onClick={() => {
                // Si quieres navegación:
                window.location.href = item.link;
              }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="extra"></div>
    </nav>
  );
};

export default Header;