import Logo from "components/Logo";
import { Link } from "react-router-dom";

const classNames = {
  menuItems:
    "text-white hover:text-gray-300 cursor-pointer transition underline",
};

function Header() {
  return (
    <header className="absolute z-10 grid grid-cols-1 lg:grid-cols-3 inset-x-0 top-0 bg-innoscripta">
      <div>
        <ul className="flex flex-row justify-around content-center items-center h-full w-full">
          <li className={classNames.menuItems}>
            <Link to="/">Top Headlines</Link>
          </li>
          <li className={classNames.menuItems}>
            <Link to="/my-feed">My Feed</Link>
          </li>
          <li className={classNames.menuItems}>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-start lg:justify-center">
        <a
          href="#"
          className="inline-block">
          <div>
            <Logo color="WHITE" />
          </div>
        </a>
      </div>
      <div></div>
    </header>
  );
}

export default Header;
