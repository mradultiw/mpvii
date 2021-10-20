import "./css/App.css";
import Graph from "./graph.js";
import Panel from "./panel.js";
import React, { useState } from "react";

function App() {
  const [activeUser, setactiveUser] = useState(null);
  const [friendAndRecommendations, setfriendAndRecommendations] =
    useState(null);

  const bridgeGraphToApp = (userid) => {
    setactiveUser(userid);
    setfriendAndRecommendations(null);
    console.log(`App.js > setting active user to: ${userid}`);
  };
  const bridgePanelToApp = (list) => {
    if (list !== null) {
      setfriendAndRecommendations(list);
    }
  };
  console.log(`App.js > rendering App`);
  return (
    <div className="App">
      <h1>Recommending Friends on Personality and Connections</h1>
      <div className="content">
        <Graph
          activeUser={activeUser}
          bridge={bridgeGraphToApp}
          friendsAndRecommendations={friendAndRecommendations}
        />
        <Panel activeUser={activeUser} bridge={bridgePanelToApp} />
      </div>
    </div>
  );
}

export default App;
