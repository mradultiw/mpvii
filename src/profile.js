import "./css/profile.css";

function Profile(props) {
  return (
    <div className="profile">
      <button type="button" className="btn btn-default btn-circle">
        <i
          className="far fa-smile"
          style={{ fontSize: "40px", display: "block" }}
        ></i>
        <span style={{ fontSize: "10px", display: "block" }}>
          {props.userid}
        </span>
      </button>
    </div>
  );
}

export default Profile;
