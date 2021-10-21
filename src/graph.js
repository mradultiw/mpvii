import "./css/graph.css";
import Profile from "./profile.js";
import React from "react";

function Graph(props) {
  const users = [];
  for (let i = 1; i <= 104; i++) users.push(i);
  console.log(`Graph.js > ${props.activeUser}`);

  return (
    <div className="graph_container">
      <div className="graph">
        {users.map((id, index) => {
          let profileType = "btn-default";
          if (id === props.activeUser) profileType = "btn-active";
          if (props.friendsAndRecommendations !== null) {
            if (props.friendsAndRecommendations[0].includes(id)) {
              // "id" is a friend
              profileType = "btn-friend";
            }
            if (props.friendsAndRecommendations[1].includes(id)) {
              // "id" is a recommendation
              /* this "if" block is for frontend testing only.
               for real scenario, use below commented because
               in real case, friendsAndRecommendations[1] is object
               with key as userid(recommended users) and value will be
               the recommendation score
               */
              profileType = "btn-recommendation";
            }
            /*
            if (id in props.friendsAndRecommendations[1]) {
              profileType = "btn-recommendation";
            }
            */
          }
          return (
            <Profile
              key={index}
              userid={id}
              profileType={profileType}
              activeUser={props.activeUser}
              bridge={props.bridge}
              refreshGraph={props.refreshGraph}
              recommendationScore={
                Math.floor(Math.random() * (100 - 50 + 1)) + 50
                // this will be from database and for frontend testing only
                /*
                props.friendsAndRecommendations[1].id

                // this is for real case scenarios where 
                // props.friendAndRecommendation[1] is object of 
                // {userid_recommendation: recommendation_score}
                */
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Graph;
