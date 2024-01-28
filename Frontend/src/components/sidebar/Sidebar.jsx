import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar(categories) {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.cats.length > 0 ? (
            categories.cats.map((category) => (
              <li className="sidebarListItem">
                <Link className="link" to={`/posts?category=${category}`}>
                  {category}
                </Link>
              </li>
            ))
          ) : (
            <p>No categories Available</p>
          )}
        </ul>
      </div>
    </div>
  );
}
