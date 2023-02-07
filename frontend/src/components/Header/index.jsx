import "./style.scss";
import AuthMenu from "../AuthMenu";

function Header() {
  return (
    <div className="header-comp">
    <header className="flex">
      <h3>SUBLET-OTI</h3>
      <AuthMenu />
    </header>
    </div>
  );
}

export default Header;
