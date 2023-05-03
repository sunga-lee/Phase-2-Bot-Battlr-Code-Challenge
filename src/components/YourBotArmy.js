import React from "react";

function YourBotArmy({ botsListed }) {
  

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          
          Your Bot Army
          {botsListed}
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;