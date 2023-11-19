import MenuItems from "components/menuItems";
import Icon from "components/icon";

function Menu() {
  return (
    <div className="absolute lg:relative right-0 flex justify-end mr-6 lg:mr-0 lg:justify-between items-center h-full w-1/3">
      <div className="desktop-menu w-full">
        <nav>
          <MenuItems />
        </nav>
      </div>

      <div className="text-white relative w-9 h-full lg:hidden cursor-pointer flex justify-center">
        <Icon type="Menu" />
        <input
          type="checkbox"
          id="menu-toggle"
          defaultChecked={false}
          className="opacity-0 cursor-pointer absolute inset-0 w-full h-full menu-toggle"
        />
        <div className="mobile-menu text-white text-center w-full h-max fixed top-16 left-0 bg-innoscripta bg-opacity-80 z-50">
          <MenuItems />
        </div>
      </div>
    </div>
  );
}

export default Menu;
