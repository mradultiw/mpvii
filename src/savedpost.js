import Post from "./post.js";
import "./css/savedpost.css";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import { GET_POSTS } from "./apis.js";

function SavedPost(props) {
  // let posts = [
  //   "hi there",
  //   "Hehehehe",
  //   "la la lala lal",
  //   "hello world!",
  //   "Hohohoholsjdakljfhkljasgdhkljfhlkajshdfkjhaskldjfhkahnsdkjlsfhnkljashndkfjsajdfkashndkfjlhwckasdbhcfasiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiidbhifhhohohohohohooh",
  // ];

  const [posts, setposts] = useState(null);
  const getPosts = async () => {
    // if (props.activeUser === null) return [];
    await axios
      .get(GET_POSTS + `?userid=${props.activeUser}`)
      .then((res) => {
        // res.data must be array of object: {timestamp, body}
        let posts = res.data;
        console.log(`SavedPosts: ${posts}`);
        setposts(posts);
      })
      .catch((err) => {
        alert(`An error occured while fetching posts: ${err}`);
      });
  };

  useEffect(() => {
    console.log(`SavedPosts.js > Running useEffect...`);
    getPosts();
  }, [props.activeUser]);

  return (
    <div className="savedpost">
      {posts !== null
        ? posts.map((post, index) => {
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
