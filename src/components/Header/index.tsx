import Logo from "components/Logo";

function Header() {
  return (
    <header className="absolute grid grid-cols-1 lg:grid-cols-3 inset-x-0 top-0 bg-innoscripta">
      <div></div>
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
