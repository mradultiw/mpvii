import "./css/profile.css";

function Profile(props) {
  const handleProfileClick = (e) => {
    console.log(`props.activeUser: ${props.activeUser}`);
    if (props.activeUser === props.userid) return;
    console.log(`props.activeUser: ${props.activeUser}`);

    /**Else
     * Ask server to send details of the new clicked profile.
     * For this:
     * (1)  The 'Panel' component should call an API("FetchUserPost")
     *    with selected profile's userid and server will send its
     *    posts. For this, the callback bridge between Graph and
     *    Panel component will be used.
     *
     * (2)  The 'Graph' component will also re-render all profiles
     *    with new profileType(colors)
     */
    props.bridge(props.userid);
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
    </div>
  );
}

export default Profile;
