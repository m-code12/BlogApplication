import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.length > 0 ? (
        posts.map((post) => <Post post={post}></Post>)
      ) : (
        <p className="noPosts">No Posts Available</p>
      )}
    </div>
  );
}
