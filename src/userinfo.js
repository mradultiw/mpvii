import "./css/userinfo.css";
import "./css/profile.css";
import axios from "axios";
import { useState, useEffect } from "react/cjs/react.development";
import { GET_USERINFO } from "./apis.js";

function UserInfo(props) {
  const [userinfo, setuserinfo] = useState({});
  const getUserInfo = async () => {
    // if (props.activeUser === null) return null;
    await axios
      .get(GET_USERINFO + `?userid=${props.activeUser}`)
      .then((res) => {
        // res.data must be object: {username, personality}
        // console.log(`UserInfo.js > userinfo: ${res.data}`);
        setuserinfo(res.data);
      })
      .catch((err) => {
        alert(`An error occured while fetching userinfo: ${err}`);
      });
  };

  useEffect(() => {
    console.log(`UserInfo > Running useEffect...`);
    getUserInfo();
  }, [props.activeUser]);

  return (
    <div className="userinfo">
      <h3>{userinfo.username}</h3>
      <h6>Personality Type: {userinfo.personality}</h6>
      <h6>Age: {18}</h6> {/* userinfo.age */}
      {/* <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-lg btn-friend hvr-wobble-skew"
          onClick={props.showFriends}
        >
          Friends
        </button>
        <button
          type="button"
          className="btn btn-lg btn-recommendation hvr-wobble-skew"
          onClick={props.showRecommendations}
        >
          Recommendations
        </button>
      </div> */}
      <button
        type="button"
        className="btn btn-lg btn-friend hvr-wobble-skew"
        onClick={props.showFriendsAndRecommendations}
      >
        <div className="btn-lg btn-friend" style={{ display: "inline-block" }}>
          Friends
        </div>
        <div
          className="btn-lg btn-recommendation"
          style={{ display: "inline-block" }}
        >
          Recommendations
        </div>
      </button>
    </div>
  );
}

export default UserInfo;
