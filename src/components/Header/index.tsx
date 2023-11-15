import logo from "assets/logo.svg";

function Header() {
  return (
    <header className="absolute flex justify-start inset-x-0 top-0 bg-innoscripta">
      <a
        href="#"
        className="inline-block">
        <img
          src={logo}
          className="p-2 h-16 fill-none"
          alt="innoscripta logo"
        />
      </a>
    </header>
  );
}

export default Header;
