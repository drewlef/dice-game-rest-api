# Node.js Dice game
A simple dice game used to introduce myself to Node.js

the player starts by rolling five dice. The objective of the game
is to achieve the lowest score they can. Each time the player
rolls they must take at least one die and has the option of taking
a second only ONLY once a game. The user tries to achieve the lowest
score with threes counting as zero

to start the server, type
# 'node diceGame.js'
to start the game, type 
# curl http://localhost:3000
in your terminal. 
the JSON returned contains the score, the dice rolled, and whether
or not the player has taken two dice.
To remove dice type, 
# curl http://localhost:3000/remove=0 
or
# http://localhost:3000/remove=0,1 
if you would to remove two dice (only once a turn)
#sample game


curl http://localhost:3000


{
  "score": 0,
  "remainingDice": [
    {
      "id": 0,
      "value": 6
    },
    {
      "id": 1,
      "value": 2
    },
    {
      "id": 2,
      "value": 3
    },
    {
      "id": 3,
      "value": 1
    },
    {
      "id": 4,
      "value": 6
    }
  ],
  "hasTakenTwo": false
}
curl http://localhost:3000/remove=2
{
  "score": 0,
  "remainingDice": [
    {
      "id": 0,
      "value": 6
    },
    {
      "id": 1,
      "value": 5
    },
    {
      "id": 3,
      "value": 3
    },
    {
      "id": 4,
      "value": 4
    }
  ],
  "hasTakenTwo": false
}


curl http://localhost:3000/remove=3


{
  "score": 0,
  "remainingDice": [
    {
      "id": 0,
      "value": 1
    },
    {
      "id": 1,
      "value": 2
    },
    {
      "id": 4,
      "value": 4
    }
  ],
  "hasTakenTwo": false
}


curl http://localhost:3000/remove=0,1


{
  "score": 3,
  "remainingDice": [
    {
      "id": 4,
      "value": 1
    }
  ],
  "hasTakenTwo": true
}


curl http://localhost:3000/remove=4


{
  "score": 4,
  "remainingDice": {},
  "hasTakenTwo": true
}

