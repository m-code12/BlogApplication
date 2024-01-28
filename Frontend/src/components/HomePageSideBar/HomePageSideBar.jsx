import { Link } from "react-router-dom";
import { cats } from "../../constants";
import "../sidebar/sidebar.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function HomePageSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((category) => (
            <li className="sidebarListItem">
              <Link className="link" to={`/posts?category=${category}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <Link
            to={"https://www.instagram.com/_introvert.9112k/"}
            target="blank"
          >
            <InstagramIcon className="sidebarIcon" />
          </Link>
          <Link to={"https://twitter.com/_introvert9112k"} target="blank">
            <TwitterIcon className="sidebarIcon" />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/saisri-angajala/"}
            target="blank"
          >
            <LinkedInIcon className="sidebarIcon" />
          </Link>

          <Link to={"https://github.com/introvert9112k"} target="blank">
            <GitHubIcon className="sidebarIcon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
