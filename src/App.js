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
    console.log(`App>activeUser: ${activeUser}`);
  };
  const bridgePanelToApp = (list) => {
    if (list !== null) {
      setfriendAndRecommendations(list);
    }
  };
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
