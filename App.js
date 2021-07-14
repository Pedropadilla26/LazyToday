
  const express = require('express')
  const app = express()
  require('dotenv').config()
  const port = process.env.PORT || 5000
  var router = express.Router()
  const got = require('got');
const { pipeline } = require('stream');
  // !important! 
  // you need to install the following libraries |express|[dotenv > if required]
  // or run this command >> npm i express dotenv 

  
  
  app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))

  app.get('/' , (req , res)=>{
  
     res.send('hello from simple server :)')
  
  })

  app.get('/heyd/', (req, res, next) => {
    request.get({
      url: 'https://sync.appfluence.com/api/v1/project/105315/owners',
      body: JSON.stringify(send),
      headers: {
         "Content-Type":"application/json",
         "Authorization": "Bearer insert_your_tocken_here"
}, 
    }, function (error, response, body) {
      console.log("hiii");
      console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        // Successful call
        var results = JSON.parse(body);
        console.log(results) // View Results
      }
      else{
          console.log("error");
      }
    });
  });


app.get('/hey', function(req, res, next) {
  request({
    url: 'http://www.giantbomb.com/api/search',
    qs: {
      api_key: '123456',
      query: 'World of Warcraft: Legion'
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        res.json(body);
      } else {
        res.json(error);
      }
    }
  });
});

module.exports = router;





app.get('/try/', function(req, res) {
  const dataStream = got.stream({
      url: 'https://swapi.dev/api/people/1/',
      
  });
  pipeline(dataStream, res, (err) => {
      if (err) {
          console.log(err);
          res.sendStatus(500);
      }
      else{
          console.log((res));
          console.log("we did it!");
      }
  });
});


app.get('/prueba/', function(req, res) {
    const dataStream = got.stream({
        url: 'https://sync.appfluence.com/api/v1/project/105315/items/',
        headers: {
            "Content-Type":"application/json",
            "Authorization": "Bearer insert_your_tocken_here"
   }, 
    });
    pipeline(dataStream, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        
        else{
            console.log("we did it!");
        }
    });
  });