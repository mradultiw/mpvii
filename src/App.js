import "./css/App.css";
import Graph from "./graph.js";
import Panel from "./panel.js";

function App() {
  return (
    <div className="App">
      <h1>Recommending Friends on Personality and Connections</h1>
      <div className="content">
        <Graph />
        <Panel username="Temporary" personality_type="xyz" />
      </div>
    </div>
  );
}

export default App;
