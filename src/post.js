import "./post.css";

function Post(props) {
  return (
    <div className="post">
      <div className="post-header">
        <text>{props.timestamp}</text>
        <button className="btn btn-xs btn-danger">Delete</button>
      </div>
      <div className="post-body">
        <p>{props.body}</p>
      </div>
    </div>
  );
}

export default Post;
