//Also need to execute npm install with node, node-fecth and prompt-async if you haven't got it.
const fetch = require("node-fetch");
const prompt = require("prompt-async");

//Default url of Appfluence api
const typical_url = `https://sync.appfluence.com/api/v1/`;

//Your token to authenticate, obtainable in https://sync.appfluence.com/o/authorized_tokens/
const my_token = 'PUT YOUR TOKEN HERE!';

console.log("\n---------------Welcome to LazyToday---------------");

//Sends a GET to the server in order to authorizate your token and get your user's id.
const login = (async () => {
  const response = await fetch(
    typical_url + `me/`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${my_token}`,
        "Content-type": "application/json",
      }
    }
  );
  if(response.ok) {
    const data = await response.json(); 
    var id = data['id'];
    console.log("Success in login, your user id is "+ id);
    return id;
  }
  else{
    console.log("The fetch petition failed");
    return 1;
  }


})();

const day = Math.trunc(Date.now() / 100000000); //Gets the part of apoch time that correlates with the day

//Sends a GET to the API in order to obtain the items assigned to your user that are due today
const items_today = (async () => {
  const id = await login;
  const response = await fetch(
    
    typical_url + `item/?owner=${id}&dueDate__startswith=${day}`,
    {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${my_token}`,
        "Content-type": "application/json",
      }
    }
  );
  if(response.ok) {
    console.log("\nHere are your items that are due today:")
    var data = await response.json();
    data = data['objects']; //Getting the individual items


    for(var i in data)
      console.log(i + ". " + data[i].name);

      console.log("\n-1. I don't want to delay any task, I feel productive today.");

    return data;
  }
  else{
    console.log("The fetch petition failed");
    return 1;
  }
})();

const tomorrow = Date.now + 86400000; //Calculates tomorrow in apoch time

//Asks you which task would you like to delay, process the answer and sends a PUT to the API to update the item.
(async () => {
  prompt.start();
  const items_t = await items_today; 
  const id = await login;
  
  console.log('\nWhich task would you like to delay? Type its number');
  const {choice} = await prompt.get(["choice"]);
  if(choice != -1){ //If you choose one to delay
    console.log("You chose to delay -" + items_t[choice].name + "- until tomorrow. Processing...");
    const item_to_delay = items_t[choice];
    const item_id = item_to_delay['id'];
    const json_tomorrow = {
      dueDate: tomorrow,
    }
    const response = await fetch(
      
      typical_url + `item/${item_id}/`,
      {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${my_token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(json_tomorrow),
      }
    );
    if(response.ok) {
      console.log("\nThe task was delayed, you can be lazy today!\n")
      return 0;
    }
    else{
      console.log("The fetch petition failed");
      return 1;
    }
  }
  else{ //If you choose -1 because you dont want to delay
    console.log("\nWill not delay any task. Stay strong!");
    return 0;
  }
})();
