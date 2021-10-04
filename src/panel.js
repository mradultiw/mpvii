import "./css/panel.css";
import UserInfo from "./userinfo.js";
import SavedPost from "./savedpost.js";
import CreatePost from "./createpost.js";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import {
  GET_POSTS,
  GET_USERINFO,
  GET_FRIENDS_AND_RECOMMENDATIONS,
} from "./apis.js";

function Panel(props) {
  const [posts, setposts] = useState([]);
  const [username, setusername] = useState("");
  const [personality, setpersonality] = useState("");

  console.log(`Panel: ${props.activeUser}`);
  const getPosts = async () => {
    await axios
      .get(GET_POSTS + `?userid=${props.activeUser}`)
      .then((res) => {
        // res.data must be array of object: {timestamp, body}
        let posts = res.data;
        console.log(posts);
        setposts(posts);
      })
      .catch((err) => {
        alert(`An error occured while fetching posts: ${err}`);
      });
  };
  const getUserInfo = async () => {
    await axios
      .get(GET_USERINFO + `?userid=${props.activeUser}`)
      .then((res) => {
        // res.data must be object: {username, personality}
        let userinfo = res.data;
        setusername(userinfo.username);
        setpersonality(userinfo.personality);
      })
      .catch((err) => {
        alert(`An error occured while fetching userinfo: ${err}`);
      });
  };
  const showFriendsAndRecommendations = async () => {
    await axios
      .get(GET_FRIENDS_AND_RECOMMENDATIONS + `?userid=${props.activeUser}`)
      .then((res) => {
        //This res.data must be a list of list as: [[Friends], [Recommendations]]
        let list = res.data;
        props.bridge(list);
      })
      .catch((err) => {
        alert(
          `An error occured while fetching Friends and Recommendations: ${err}`
        );
      });
  };

  useEffect(() => {
    if (props.activeUser === null) return;
    console.log("Executing Panel>useEffect");
    getUserInfo().then(() => getPosts());
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
          showFriendsAndRecommendations={showFriendsAndRecommendations}
        />
        <SavedPost posts={posts} />
        <CreatePost />
      </div>
    </div>
  );
}

export default Panel;
