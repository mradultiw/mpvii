import "./css/createpost.css";
import "./css/profile.css";
import axios from "axios";
import { useState, useEffect } from "react/cjs/react.development";
import { ADD_NEW_POST } from "./apis.js";

const getDateTime = () => {
  const obj = new Date();
  const day = obj.getDate(),
    month = obj.getMonth() + 1,
    year = obj.getFullYear(),
    time = obj.toLocaleTimeString("it-IT");

  return `${day}/${month}/${year} | ${time}`;
};

function CreatePost(props) {
  const [newpost, setnewpost] = useState(null);

  const addNewPost = async (post) => {
    let newpost = {
      userid: props.activeUser,
      timestamp: getDateTime(),
      body: post,
    };
    await axios
      .post(ADD_NEW_POST, newpost)
      .then(() => {
        console.log("Data posted successfully to server!");
        props.updateNewPost(newpost);
      })
      .catch((e) => {
        console.log(`error while posting data to server: ${e}`);
      });
  };

  return (
    <div className="createpost form">
      <input
        className="input-post"
        placeholder="What's on your mind?"
        onChange={(e) => {
          setnewpost(e.target.value.trim());
        }}
      ></input>
      <button
        className="btn-circle hvr-forward"
        type="button"
        onClick={() => addNewPost(newpost)}
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <i className="fa fa-arrow-circle-right fa-lg"></i>
      </button>
    </div>
  );
}

export default CreatePost;
