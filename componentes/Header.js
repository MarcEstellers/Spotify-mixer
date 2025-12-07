import { Headerlinks } from "./data";
import './Header.css';



const Header = () => {

  return (
    <nav className= "header">
      <div className= "logo">
        <p>SPOTYFY</p>
      </div>

      <ul className= "menu">
        {Headerlinks.map((item) => (
          <li key={item.id}>
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
      <div className= "extra"></div>
    </nav>
  );
};

export default Header;