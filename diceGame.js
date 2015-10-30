var express = require('express');

var app = express();

var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var Die = require('./classes/die.js');
var RemainingDice = require('./classes/remainingDice.js');

var score;
//boolean to track if the player should be prompted to take a second die
var playerHasTakenTwoDice;
var remainingDice;

//rolls and scores the players remaining dice
var playNextRound = function(res) {
  if (remainingDice.collection.length > 0) {
    var responseJSON;
    remainingDice.rollTheDice();
    responseJSON = {
      "score": score,
      "remainingDice": JSON.parse(JSON.stringify(remainingDice.collection)),
      "hasTakenTwo": playerHasTakenTwoDice
    };
  } else {
    responseJSON = {
      "score": score,
      remainingDice: {},
      "hasTakenTwo": playerHasTakenTwoDice
    };
  }
  res.send(responseJSON);
};
app.listen(3000);
console.log('Listening on port 3000...');
app.get('/', function(req, res) {
  remainingDice = new RemainingDice();
  score = 0;
  playerHasTakenTwoDice = false;
  playNextRound(res);
});

//ENHANCE: don't allow the user to enter more than two dice. Warn the user when they attempt to take two dice twice
//remove and score the dice ids. If 2 are selected change the boolean playerHasTakenTwoDice
// to true.
app.get('/remove=:ids', function(req, res) {
  var ids = req.params.ids.split(',');
  score += remainingDice.removeAndScoreDie(ids[0]);
  if (ids.length === 2 && !playerHasTakenTwoDice) {
    score += remainingDice.removeAndScoreDie(ids[1]);
    playerHasTakenTwoDice = true;
  }
  playNextRound(res);
});
