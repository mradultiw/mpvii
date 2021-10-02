import "./css/panel.css";
import UserInfo from "./userinfo.js";
import SavedPost from "./savedpost.js";
import CreatePost from "./createpost.js";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import {
  GET_POSTS,
  GET_USERINFO,
  GET_FRIENDS,
  GET_RECOMMENDATIONS,
} from "./apis.js";

function Panel(props) {
  const [posts, setposts] = useState([]);
  const [username, setusername] = useState("");
  const [personality, setpersonality] = useState("");

  const getPosts = () => {
    axios
      .get(GET_POSTS)
      .then((posts) => {
        setposts(posts);
      })
      .catch((err) => {
        alert(`An error occured while fetching posts: ${err}`);
      });
  };
  const getUserInfo = () => {
    axios
      .get(GET_USERINFO)
      .then((userinfo) => {
        setusername(userinfo.username);
        setpersonality(userinfo.personality);
      })
      .catch((err) => {
        alert(`An error occured while fetching userinfo: ${err}`);
      });
  };
  const showFriends = () => {};
  const showRecommendations = () => {};

  useEffect(() => {
    if (props.activeUser === null) return;
    getUserInfo();
    getPosts();
  });
  if (props.activeUser === null) {
    return <div className="empty-panel"></div>;
  }
  return (
    <div className="panel-container">
      <div className="panel">
        <UserInfo
          username={username}
          personality_type={personality}
          showFriends={showFriends}
          showRecommendations={showRecommendations}
        />
        <SavedPost posts={posts} />
        <CreatePost />
      </div>
    </div>
  );
}

export default Panel;
