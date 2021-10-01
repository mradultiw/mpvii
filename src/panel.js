import "./css/panel.css";
import UserInfo from "./userinfo.js";
import SavedPost from "./savedpost.js";
import CreatePost from "./createpost.js";

function Panel(props) {
  if (props.activeUser === null) {
    return <div className="empty-panel"></div>;
  }
  return (
    <div className="panel-container">
      <div className="panel">
        <UserInfo
          username={props.username}
          personality_type={props.personality_type}
        />
        <SavedPost />
        <CreatePost />
      </div>
    </div>
  );
}

export default Panel;
