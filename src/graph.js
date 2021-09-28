import "./graph.css";
import Profile from "./profile.js";

function Graph() {
  const users = [];
  for (let i = 1; i <= 60; i++) users.push(i); // from database

  const profiles = users.map((id, index) => {
    return <Profile key={index} userid={id} />;
  });

  return (
    <div className="graph_container">
      <div className="graph">{profiles}</div>
    </div>
  );
}

export default Graph;
