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

//remove and score a second die, if the user selects one
// var promptSecondDie = function(firstDieTaken) {
//   readline.question("\nYou have the option to take a second die once (hit enter to decline)\n", function(secondDieTaken) {
//     if (secondDieTaken !== "" && secondDieTaken !== firstDieTaken) {
//       score += remainingDice.removeAndScoreTwoDice(firstDieTaken, secondDieTaken);
//       playerHasTakenTwoDice = true;
//     } else {
//       score += remainingDice.removeAndScoreDie(firstDieTaken);
//     }
//     playNextRound();
//   });
// };

// //prompt the user to select a die to be scored and if eligible, prompts the user to remove a second die
// var promptFirstDie = function() {
//   readline.question("\nenter the id of the die you would like to keep\n", function(firstDieTaken) {
//
//   });
// };

//rolls and scores the players remaining dice
var playNextRound = function(res) {
  if (remainingDice.collection.length > 0) {
    var responseJSON;
    console.log("\nSCORE: " + score);
    remainingDice.rollTheDice();
    responseJSON = {
      "score": score,
      "remainingDice": JSON.parse(JSON.stringify(remainingDice.collection)),
      "hasTakenTwo": playerHasTakenTwoDice
    };
  } else {
    responseJSON = {
      "score": score
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
app.get('/remove/:id', function(req, res) {
  score += remainingDice.removeAndScoreDie(req.params.id);
  playNextRound(res);
});
app.get('/remove/:id/:id2', function(req, res) {
  if (!playerHasTakenTwoDice) {
    score += remainingDice.removeAndScoreDie(req.params.id);
    score += remainingDice.removeAndScoreDie(req.params.id2);
    playerHasTakenTwoDice = true;
    playNextRound(res);
  }
});
