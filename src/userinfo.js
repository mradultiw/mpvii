import "./userinfo.css";
import "./profile.css";

function UserInfo(props) {
  return (
    <div className="userinfo">
      <h3>{props.username}</h3>
      <h6>Personality Type: {props.personality_type}</h6>
      <div className="btn-group" role="group">
        <button type="button" class="btn btn-lg btn-friend">
          Friends
        </button>
        <button type="button" class="btn btn-lg btn-recommendation">
          Recommendations
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
