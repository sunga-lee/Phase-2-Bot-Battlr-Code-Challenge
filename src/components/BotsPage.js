import React, {useState, useEffect, useRef} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotCard from "./BotCard";
import BotSpecs from "./BotSpecs";
import SortBar from "./SortBar";


function BotsPage() {
  
  const botsUrl = " http://localhost:8002/bots";
  const [bots, setBots] = useState([]);
  const [botsListed, setBotsListed] = useState([]);
  const [showBotSpecs, setShowBotSpecs] = useState(null);
  const [filteredBots, setFilteredBots] = useState([]);
  const [showSortBar, setShowSortBar] = useState(true) //Initially visible
  const sortStrategy = useRef({ health: 1, damage: 1, armor: 1 })

  //Fetch Bots
  useEffect(()=> {
    fetch(`${botsUrl}`)
    .then(response => response.json())
    .then(data => {
      setBots(data);
      setFilteredBots(data);
    });
  }, [])

  //Check if a bot is already listed
  function alreadyListedBot(bot) {
    return Boolean(botsListed.find(botListed => botListed.id === bot.id))
  }

  //Get bots of the same class
  function getBotsOfSameClass (bot) {
    return botsListed.find(botListed => botListed.bot_class === bot.bot_class)
  }

  //Delete bot from server
  function deleteBot(botToDelete){
    fetch(`${botsUrl}/${botToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(() => {
      setBots(bots.filter(currentBot => currentBot.id !== botToDelete.id))
      setBotsListed(botsListed.filter(botListed => botListed.id !== botToDelete.id))
    })
  }

  //Handler for Bot Actions
  function handleBotActionClick(bot, action){
     // eslint-disable-next-line
    switch (action){
      case "release-bot":
        deleteBot(bot)   
        break;
             
      case "enlist-bot":
        const listedBotsOfSameClass = getBotsOfSameClass(bot);
        if(!listedBotsOfSameClass){
          setBotsListed([...botsListed, bot])
          setFilteredBots(filteredBots.filter(currentBot => currentBot.id !== bot.id))
        } else {
          alert(`${listedBotsOfSameClass.name} has already been enlisted for the ${bot.bot_class} role`)
        }
        break;

      case "delist-bot":
        setBotsListed(botsListed.filter(currentBot => currentBot.id !== bot.id))
        setFilteredBots([...filteredBots, bot])
        break;

      case "show-all-bots":
        setShowBotSpecs(null);
        setShowSortBar(true)
        break;
  
      case "show-bot-specs":
        setShowBotSpecs(bot);
        setShowSortBar(false);
    }
  }

  //Sorting Functionality
  function sortBots(data, sortBy){
    data.sort((a, b) => {
      if(a[sortBy] > b[sortBy]){
        return sortStrategy.current[sortBy] * 1
      }else if(a[sortBy] < b[sortBy]){
        return sortStrategy.current[sortBy] * -1
      } else {
        return 0
      }
    })

    return data
  }


  function updateSortStrategy(sortBy){
    sortStrategy.current[sortBy] *= -1 //if it was ascending, make it descending and vice versa
  }


  function handleSortAction(sortBy){
    updateSortStrategy(sortBy)
    setFilteredBots(sortBots([...filteredBots], sortBy))
  }

  function botsList (botsArray) {
    return botsArray.map(bot => <BotCard key={bot.id} bot={bot} handleBotActionClick={handleBotActionClick} /> )
  }

  return (
    <div>
      <YourBotArmy botsListed={botsList(botsListed)} />
      {showSortBar ? <SortBar handleSortAction={handleSortAction}/> : <div></div>}
      {showBotSpecs ? <BotSpecs bot={showBotSpecs} handleBotActionClick={handleBotActionClick} alreadyListedBot={alreadyListedBot(showBotSpecs)} /> : <BotCollection filteredBots={botsList(filteredBots)} />}
    </div>
  )
}

export default BotsPage;