import "./css/panel.css";
import UserInfo from "./userinfo.js";
import SavedPost from "./savedpost.js";
import CreatePost from "./createpost.js";
import axios from "axios";
import { GET_FRIENDS_AND_RECOMMENDATIONS } from "./apis.js";
import { useState } from "react/cjs/react.development";

function Panel(props) {
  const [newpost, setnewpost] = useState(null);

  console.log(`Panel.js > ${props.activeUser}`);

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
        <SavedPost activeUser={props.activeUser} newpost={newpost} />
        <CreatePost activeUser={props.activeUser} updateNewPost={setnewpost} />
      </div>
    </div>
  );
}

export default Panel;
