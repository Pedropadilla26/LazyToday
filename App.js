
const { log } = require("console");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const fetch = require("node-fetch");
const prompt = require("prompt");

// construct the URL to post to a publication
const typical_url = `https://sync.appfluence.com/api/v1/`;
const my_token = 'PUT YOUR PERSONAL TOKEN HERE';

console.log("\n---------------Hello!---------------");

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
    const data = await response.json(); // Here you have the data that you need
    var id = data['id'];
    console.log("Success in login, your id is "+ id);
    return id;
  }
  else{
    console.log("The fetch petition failed");
    return 1;
  }


})();

const day = Math.trunc(Date.now() / 100000000);

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
    var data = await response.json(); // Here you have the data that you need
    data = data['objects'];

    for(var i in data)
      console.log(i + ". " + data[i].name)

    return data;
  }
  else{
    console.log("The fetch petition failed");
    return 1;
  }
})();

/*
(async () => {
  const items_t = await items_today; 
  const id = await login;
  const {election} = await prompt.get(['Which item would you like to push?']);
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
    console.log("\nHere are your items for today:")
    const data = await response.json(); // Here you have the data that you need
    console.log(data['objects']['owner_username']);
  }
  else{
    console.log("The fetch petition failed");
    return 1;
  }
})();
*/
