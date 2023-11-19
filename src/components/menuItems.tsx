import { Link } from "react-router-dom";

const classNames = {
  menuItems:
    "text-white hover:text-gray-300 cursor-pointer transition underline py-3 border border-x-0 border-t-0 border-b-1 border-gray-300 lg:border-0",
};

function MenuItems() {
  return (
    <div className="flex flex-col lg:flex-row justify-around">
      <Link
        to="/"
        className={classNames.menuItems}>
        Top Headlines
      </Link>
      <Link
        to="/my-feed"
        className={classNames.menuItems}>
        My Feed
      </Link>
      <Link
        to="/settings"
        className={classNames.menuItems}>
        Settings
      </Link>
    </div>
  );
}

export default MenuItems;
