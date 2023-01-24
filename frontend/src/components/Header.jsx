import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice.js";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
   
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  };

  return (
    <header>
      <h3>SUBLET-OTI</h3>
      <button className="auth-btn"></button>
      <ul>
        {user ? (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
