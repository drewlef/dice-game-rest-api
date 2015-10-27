var Die = require('./die.js');

//A class that contains the remaining dice to be rolled and scored by the player
var RemainingDice = function() {
  this.collection = [];
  this.collection.push(new Die(0));
  this.collection.push(new Die(1));
  this.collection.push(new Die(2));
  this.collection.push(new Die(3));
  this.collection.push(new Die(4));
};

//rolls the dice and return the json of the rolled dice
RemainingDice.prototype.rollTheDice = function() {
  for (var i = 0; i < this.collection.length; i++) {
    this.collection[i].roll();
  }
};

//removes the selected die from the collection and returns the value
RemainingDice.prototype.removeAndScoreDie = function(id) {
  for (var i = 0; i < this.collection.length; i++) {
    if (this.collection[i].id == id) {
      console.log("SUCCESS: " + this.collection[i].value);
      var value = this.collection[i].value
      this.collection.splice(i, 1);
      console.log("SUCCESS: " + value);
      if (value === 3) {
        return 0;
      } else {
        return value;
      }
    }
  }
};

//removes two dice and returns the score or the two. This function is necessary to ensure the
//order the dice are removed in the correct order
RemainingDice.prototype.removeAndScoreTwoDice = function(firstDieTaken, secondDieTaken) {
  var score = 0
  if (parseInt(firstDieTaken) >= secondDieTaken) {
    score += this.removeAndScoreDie(firstDieTaken);
    score += this.removeAndScoreDie(secondDieTaken);
  } else {
    score += this.removeAndScoreDie(secondDieTaken);
    score += this.removeAndScoreDie(firstDieTaken);
  }
  return score;
};

module.exports = RemainingDice;
