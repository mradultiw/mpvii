import "./css/userinfo.css";
import "./css/profile.css";

function UserInfo(props) {
  return (
    <div className="userinfo">
      <h3>{props.username}</h3>
      <h6>Personality Type: {props.personality_type}</h6>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-lg btn-friend hvr-wobble-skew">
          Friends
        </button>
        <button
          type="button"
          className="btn btn-lg btn-recommendation hvr-wobble-skew"
        >
          Recommendations
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
