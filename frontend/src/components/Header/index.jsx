import "./style.scss";
import AuthMenu from "../AuthMenu";
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate()
  return (
    <div className="header-comp">
    <header className="flex">
      <h3 className="logo" onClick={()=>navigate("/")}>SUBLET-OTI</h3>
      <AuthMenu />
    </header>
    </div>
  );
}

export default Header;
