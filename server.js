// Require Express.js

import express from 'express';

const app = express();

// Start an app server

const server = app.listen(5000, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', 5000))
});


app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respind with status message 'OK'
        res.statusMessage = "OK";
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain '});
        res.end(res.statusCode + ' ' + res.statusMessage);
});


// Helper functions

function coinFlip() {
    const options = ["heads", "tails"];
  
    const randomNumber = Math.floor(Math.random() * options.length);
  
    return options[randomNumber];
}

function coinFlips(flips) {
    const result = [];

    for (let i = 0; i < flips; i++) {
      result[i] = coinFlip();
    }

    return result;
}

function countFlips(array) {
    let headCount = 0;
    let tailsCount = 0;
    
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        headCount++;
      } 
  
      if (array[i] == "tails") {
        tailsCount++;
      }
    }
  
    if (headCount == 0 || tailsCount == 0) {
      if (headCount == 0) {
        return "{ tails: " + tailsCount + " }";
      } else if (tailsCount == 0) {
        return "{ heads: " + headCount + " }";
      }
    }
  
    let result = "{ tails: " + tailsCount + ", heads: " + headCount + " }";
  
    return result;
}

function flipACoin(call) {
    let flipResult = "";
  
    let flip = coinFlip();
  
    if (flip == call) {
      flipResult = "win";
    } else {
      flipResult = "lose";
    }
  
    let result = "{ call: " + call + ", flip: " + flip + ", result: " + flipResult + " }";
  
    return result;
}
  
// Define check endpoint

app.get('/app/flip', (req, res) => {
    res.send({"flip": coinFlip()});
})

app.get('/app/flips/:number', (req, res) => {  
    const flipResult = coinFlips(req.params.number);

    
    const result = {
        "raw": flipResult,
        "summary": countFlips(flipResult)
    }

    res.json(result);  
})

app.get('/app/flip/call/heads', (req, res) => {
    const headsString = "heads"

    res.json(flipACoin(headsString));
})

app.get('/app/flip/call/tails', (req, res) => {
    const tailsString = "tails"

    res.json(flipACoin(tailsString));
})

// Default response for any other request 

app.use(function(req, res) {
  res.status(404).send('404 NOT FOUND')
});