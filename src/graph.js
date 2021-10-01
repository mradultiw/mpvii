import "./css/graph.css";
import Profile from "./profile.js";
import React, { useState, useEffect } from "react";

function Graph(props) {
  const [activeUser, setactiveUser] = useState(null);

  const users = [];
  for (let i = 1; i <= 104; i++) users.push(i);

  return (
    <div className="graph_container">
      <div className="graph">
        {users.map((id, index) => {
          let profileType = "btn-default";
          if (activeUser === id) profileType = "btn-active";
          return (
            <Profile
              key={index}
              userid={id}
              profileType={profileType}
              setactiveUser={setactiveUser}
              bridge={props.bridge}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Graph;
