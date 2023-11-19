import Logo from "components/logo";
import Menu from "components/menu";

function Header() {
  return (
    <header className="absolute flex justify-start items-center z-10 inset-x-0 top-0 bg-innoscripta">
      <Menu />
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
