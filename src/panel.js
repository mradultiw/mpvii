import "./css/panel.css";
import UserInfo from "./userinfo.js";
import SavedPost from "./savedpost.js";
import CreatePost from "./createpost.js";
import axios from "axios";
import { GET_FRIENDS_AND_RECOMMENDATIONS } from "./apis.js";

function Panel(props) {
  // const [posts, setposts] = useState([]);
  // const [username, setusername] = useState("");
  // const [personality, setpersonality] = useState("");

  console.log(`Panel.js > ${props.activeUser}`);
  // const getPosts = async () => {
  //   if (props.activeUser === null) return [];
  //   let posts = await axios
  //     .get(GET_POSTS + `?userid=${props.activeUser}`)
  //     .then((res) => {
  //       // res.data must be array of object: {timestamp, body}
  //       let posts = res.data;
  //       console.log(posts);
  //       setposts(posts);
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       alert(`An error occured while fetching posts: ${err}`);
  //     });
  //   console.log(posts);
  //   return posts;
  // };
  // const getUsername = async () => {
  //   if (props.activeUser === null) return null;
  //   let username = await axios
  //     .get(GET_USERNAME + `?userid=${props.activeUser}`)
  //     .then((res) => {
  //       // res.data must be object: {username, personality}
  //       let userinfo = res.data;
  //       setusername(userinfo.username);
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       alert(`An error occured while fetching userinfo: ${err}`);
  //     });
  //   console.log(username);
  //   return username;
  // };
  // const getPersonality = async () => {
  //   if (props.activeUser === null) return null;
  //   let personality = await axios
  //     .get(GET_PERSONALITY + `?userid=${props.activeUser}`)
  //     .then((res) => {
  //       // res.data must be object: {username, personality}
  //       let userinfo = res.data;
  //       setpersonality(userinfo.personality);
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       alert(`An error occured while fetching userinfo: ${err}`);
  //     });
  //   console.log(personality);
  //   return personality;
  // };
  // const getUserInfo = async () => {
  //   if (props.activeUser === null) return null;
  //   let userinfo = await axios
  //     .get(GET_USERINFO + `?userid=${props.activeUser}`)
  //     .then((res) => {
  //       // res.data must be object: {username, personality}
  //       let userinfo = res.data;
  //       setusername(userinfo.username);
  //       setpersonality(userinfo.personality);
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       alert(`An error occured while fetching userinfo: ${err}`);
  //     });
  //   console.log(userinfo);
  //   return userinfo;
  // };
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

  if (props.activeUser === null) {
    return <div className="empty-panel"></div>;
  }
  console.log(`Panel.js > rendering panel`);

  return (
    <div className="panel-container">
      <div className="panel">
        <UserInfo
          activeUser={props.activeUser}
          showFriendsAndRecommendations={showFriendsAndRecommendations}
        />
        <SavedPost activeUser={props.activeUser} />
        <CreatePost />
      </div>
    </div>
  );
}

export default Panel;
