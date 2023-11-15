import Logo from "components/Logo";

function Header() {
  return (
    <header className="absolute flex inset-x-0 top-0 bg-innoscripta">
      <div>
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
