'use strict';

//Selecting elements

//total scores
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

//dice
const diceEl = document.querySelector('.dice');

//buttons
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

//current scores
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//active player
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const scores = [0, 0];
let rolledDice = 0;
let activePlayer = 0;
let playing = true;

//Setting them to 0
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Player switch function

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling dice functionality
btnRollEl.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1: if ture, switch to next player

    if (dice !== 1) {
      //add rolled dice to current score
      rolledDice += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        rolledDice;
    } else {
      // switch to next player

      document.getElementById(`current--${activePlayer}`).textContent = 0;
      rolledDice = 0;
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener('click', function () {
  if (playing) {
    //add current score to (array)total score for active player

    scores[activePlayer] += rolledDice;
    rolledDice = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores);
    // Check if active player has 100 or more score to win
    if (scores[activePlayer] >= 10) {
      playing = false;

      // add special vision to winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //hide the dice
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }

    //reset current score
    //switch player
  }
});

btnNewEl.addEventListener('click', function () {
  // reset scores
  score0El.textContent = 0;
  score1El.textContent = 0;
  // hide the dice
  diceEl.classList.add('hidden');

  //reset current
  current0El.textContent = 0;
  current1El.textContent = 0;

  //reset scores array
  scores[0] = 0;
  scores[1] = 0;

  //reset winner color
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  playing = true;
});
