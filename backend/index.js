const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello nico!");
});

app.get("/bye", (req, res) => {
  res.send("Bye nico!");
});

app.get('/month', async function(req, res) {
  let y = req.query.y;
  let m = req.query.m;

  res.send(`Got month ${m} and year ${y}`)
});


// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
