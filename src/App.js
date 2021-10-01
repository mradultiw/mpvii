import "./css/App.css";
import Graph from "./graph.js";
import Panel from "./panel.js";
import React, { useState } from "react";

function App() {
  const [activeUser, setactiveUser] = useState(null);
  const [friends, setfriends] = useState(null);
  const [recommendations, setrecommendations] = useState(null);

  const bridgeGraphToApp = (userid) => {
    setactiveUser(userid);
  };
  const bridgePanelToApp = (userinfo) => {
    if (userinfo.friends !== null) {
      setfriends(userinfo.friends);
    }
    if (userinfo.recommendations !== null) {
      setrecommendations(userinfo.recommendations);
    }
  };
  return (
    <div className="App">
      <h1>Recommending Friends on Personality and Connections</h1>
      <div className="content">
        <Graph
          bridge={bridgeGraphToApp}
          friends={friends}
          recommendations={recommendations}
        />
        <Panel
          activeUser={activeUser}
          bridge={bridgePanelToApp}
          username="Temporary"
          personality_type="wxyz"
        />
      </div>
    </div>
  );
}

export default App;
