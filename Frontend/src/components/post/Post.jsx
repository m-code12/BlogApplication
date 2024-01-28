import { Link } from "react-router-dom";
import "./post.css";
import img from "../../constants";

export default function Post({ post }) {
  return (
    <div className="post">
      {post.image ? (
        <img className="postImg" src={post.image} alt="" />
      ) : (
        <img className="postImg" src={img} alt="" />
      )}
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.description}</p>
    </div>
  );
} 
