import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        body: sessionStorage.getItem("refreshToken"),
      });
      if (!response.ok) {
        response = response.json();
        throw new Error(response.msg);
      }
      navigate("/login");
    } catch (error) {
      console.log("logout Unsucessful");
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && (
            <li className="topListItem" onClick={handleLogout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
