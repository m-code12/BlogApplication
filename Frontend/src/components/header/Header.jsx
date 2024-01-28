import "./header.css";
import img from "../../constants";
export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img className="headerImg" src={img} alt="" />
    </div>
  );
}
