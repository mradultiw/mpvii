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
              <Post
                key={index}
                timestamp={"28/9/2021 | 14:27:27"}
                body={post}
              />
            );
          })
        : []}
    </div>
  );
}

export default SavedPost;
