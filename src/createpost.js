import "./css/createpost.css";
import "./css/profile.css";

const getDateTime = () => {
  const obj = new Date();
  const day = obj.getDate(),
    month = obj.getMonth() + 1,
    year = obj.getFullYear(),
    time = obj.toLocaleTimeString("it-IT");

  return `${day}/${month}/${year} | ${time}`;
};

function CreatePost(props) {
  return (
    <div className="createpost form">
      <input className="input-post" placeholder="What's on your mind?"></input>
      <button
        className="btn-circle hvr-forward"
        type="button"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <i className="fa fa-arrow-circle-right fa-lg"></i>
      </button>
    </div>
  );
}

export default CreatePost;
