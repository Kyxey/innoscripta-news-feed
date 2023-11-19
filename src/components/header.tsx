import Logo from "components/logo";
import { Link } from "react-router-dom";

const classNames = {
  menuItems:
    "text-white hover:text-gray-300 cursor-pointer transition underline",
};

function Header() {
  return (
    <header className="absolute flex justify-start items-center z-10 inset-x-0 top-0 bg-innoscripta">
      <div className="flex flex-row h-full w-1/3">
        <ul className="w-full flex justify-around">
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
      <div className="flex w-1/2 lg:w-1/3 justify-start lg:justify-center">
        <a
          href="#"
          className="inline-block">
          <div>
            <Logo color="WHITE" />
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
