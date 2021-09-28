import Post from "./post.js";
import "./css/savedpost.css";

function SavedPost(props) {
  let posts = [
    "hi there",
    "Hehehehe",
    "la la lala lal",
    "hello world!",
    "Hohohohohohohohohohooh",
  ];
  // posts = [];
  const posts_render = posts.map((post, index) => {
    return <Post key={index} timestamp={"28/9/2021"} body={post} />;
  });
  return <div className="savedpost">{posts_render}</div>;
}

export default SavedPost;
