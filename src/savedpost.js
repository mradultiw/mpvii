import Post from "./post.js";
import "./css/savedpost.css";

function SavedPost(props) {
  // let posts = [
  //   "hi there",
  //   "Hehehehe",
  //   "la la lala lal",
  //   "hello world!",
  //   "Hohohoholsjdakljfhkljasgdhkljfhlkajshdfkjhaskldjfhkahnsdkjlsfhnkljashndkfjsajdfkashndkfjlhwckasdbhcfasiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiidbhifhhohohohohohooh",
  // ];
  return (
    <div className="savedpost">
      {props.posts !== null
        ? props.posts.map((post, index) => {
            return (
              // <Post key={index} timestamp={post.timestamp} body={post.body} /> // this is original
              <Post key={index} body={post} /> // this is temp
            );
          })
        : []}
    </div>
  );
}

export default SavedPost;
