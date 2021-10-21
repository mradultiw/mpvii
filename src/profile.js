import "./css/profile.css";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import { ADD_FRIEND, REMOVE_FRIEND } from "./apis.js";

function Profile(props) {
  const [friendstatus, setfriendstatus] = useState(null);
  const handleProfileClick = (e) => {
    if (props.activeUser === props.userid) return;
    props.bridge(props.userid);
  };
  const addOrRemoveFriend = (e) => {
    let operation =
      props.profileType === "btn-friend" ? REMOVE_FRIEND : ADD_FRIEND;
    axios
      .get(operation, {
        params: {
          userid: props.userid,
          activeUser: props.activeUser,
        },
      })
      .then(() => {})
      .catch((e) => console.log(`${e}`));
  };

  return (
    <div className="profile">
      <button
        type="button"
        className={`btn btn-circle hvr-pop ${props.profileType}`}
        onClick={handleProfileClick}
      >
        <i
          className="far fa-smile"
          style={{ fontSize: "28px", display: "block" }}
        ></i>
        <span style={{ fontSize: "10px", display: "block" }}>
          {props.userid}
        </span>
      </button>
      <button
        type="button"
        className={`friendstatus btn btn-sm 	hvr-pulse`}
        style={{
          display:
            props.activeUser === props.userid || props.activeUser === null
              ? "none"
              : "",
          backgroundColor:
            props.profileType === "btn-friend" ? "#FF0000" : "#3DB2FF",
        }}
        onClick={addOrRemoveFriend}
      >
        {props.profileType === "btn-friend" ? "-" : "+"}
      </button>
    </div>
  );
}

export default Profile;
