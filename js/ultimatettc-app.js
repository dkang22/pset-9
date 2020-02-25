///////////////////// CONSTANTS /////////////////////////////////////
const miniWinningConditions1 = [
  //minibox 1
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

const miniWinningConditions2 = [
  //minibox 2
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19],
  [11, 14, 17],
  [12, 15, 18],
  [13, 16, 19],
  [11, 15, 19],
  [13, 15, 17]
]

const miniWinningConditions3 = [
  //minibox 3
  [21, 22, 23],
  [24, 25, 26],
  [27, 28, 29],
  [21, 24, 27],
  [22, 25, 28],
  [23, 26, 29],
  [21, 25, 29],
  [23, 25, 27]
]

const miniWinningConditions4 = [
  //minibox 4
  [31, 32, 33],
  [34, 35, 36],
  [37, 38, 39],
  [31, 34, 37],
  [32, 35, 38],
  [33, 36, 39],
  [31, 35, 39],
  [33, 35, 37]
]

const miniWinningConditions5 = [
  //minibox 5
  [41, 42, 43],
  [44, 45, 46],
  [47, 48, 49],
  [41, 44, 47],
  [42, 45, 48],
  [43, 46, 49],
  [41, 45, 49],
  [43, 45, 47]
]

const miniWinningConditions6 = [
  //minibox 6
  [51, 52, 53],
  [54, 55, 56],
  [57, 58, 59],
  [51, 54, 57],
  [52, 55, 58],
  [53, 56, 59],
  [51, 55, 59],
  [53, 55, 57]
]

const miniWinningConditions7 = [
  //minibox 7
  [61, 62, 63],
  [64, 65, 66],
  [67, 68, 69],
  [61, 64, 67],
  [62, 65, 68],
  [63, 66, 69],
  [61, 65, 69],
  [63, 65, 67]
]

const miniWinningConditions8 = [
  //minibox 8
  [71, 72, 73],
  [74, 75, 76],
  [77, 78, 79],
  [71, 74, 77],
  [72, 75, 78],
  [73, 76, 79],
  [71, 75, 79],
  [73, 75, 77]
]

const miniWinningConditions9 = [
  //minibox 9
  [81, 82, 83],
  [84, 85, 86],
  [87, 88, 89],
  [81, 84, 87],
  [82, 85, 88],
  [83, 86, 89],
  [81, 85, 89],
  [83, 85, 87]
]

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let overallWin = false;
let localWin1 = false;
let localWin2 = false;
let localWin3 = false;
let localWin4 = false;
let localWin5 = false;
let localWin6 = false;
let localWin7 = false;
let localWin8 = false;
let localWin9 = false;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = [
  ];

  turn = "X";
  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent = win ? `${overallWin} wins!` : `Turn: ${turn}`;

  //returns "undefined wins"
}

function takeTurn(e) {
  if (!overallWin) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (squares[index].textContent !== "X" && squares[index].textContent !== "O") {
      board[index] = turn;

      if(localWin1 === "X" || localWin1 === "O") {
      } else {
        localWin1 = getLocalWinner1(e);
      }

      if(localWin2 === "X" || localWin2 === "O") {
      } else {
        localWin2 = getLocalWinner2(e);
      }

      if(localWin3 === "X" || localWin3 === "O") {
      } else {
        localWin3 = getLocalWinner3(e);
      }

      if(localWin4 === "X" || localWin4 === "O") {
      } else {
        localWin4 = getLocalWinner4(e);
      }

      if(localWin5 === "X" || localWin5 === "O") {
      } else {
        localWin5 = getLocalWinner5(e);
      }

      if(localWin6 === "X" || localWin6 === "O") {
      } else {
        localWin6 = getLocalWinner6(e);
      }

      if(localWin7 === "X" || localWin7 === "O") {
      } else {
        localWin7 = getLocalWinner7(e);
      }

      if(localWin8 === "X" || localWin8 === "O") {
      } else {
        localWin8 = getLocalWinner8(e);
      }

      if(localWin9 === "X" || localWin9 === "O") {
      } else {
        localWin9 = getLocalWinner9(e);
      }

      render();
      overallWin = getOverallWinner();

      turn = turn === "X" ? "O" : "X";
    }
/*
    if(localWin1 === true) {
      let bigIndex = Math.floor((index/10));
      if (bigIndex !== 0) {
        bigIndex = bigIndex * 10;
      }
      turn = turn === "X" ? "O" : "X";
      squares[bigIndex].textContent = turn;

    }
    if(localWin2 === true) {
      let bigIndex = Math.floor((index/10));
      if (bigIndex !== 0) {
        bigIndex = bigIndex * 10;
      }
      turn = turn === "X" ? "O" : "X";
      squares[bigIndex].textContent = turn;

    }
*/
    render();
  }
}

function getLocalWinner1(e){
  let winner = false;

  miniWinningConditions1.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin1 = true;
    console.log("LOCAL WINNER 1");
  }
  });

  return winner;
}

function getLocalWinner2(e){
  let winner = false;

  miniWinningConditions2.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin2 = true;
    console.log("LOCAL WINNER 2");
    }
  });

  return winner;
}

function getLocalWinner3(e){
  let winner = false;

  miniWinningConditions3.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin3 = true;
    console.log("LOCAL WINNER 3");
    }
  });

  return winner;
}

function getLocalWinner4(e){
  let winner = false;

  miniWinningConditions4.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin4 = true;
    console.log("LOCAL WINNER 4");
    }
  });

  return winner;
}

function getLocalWinner5(e){
  let winner = false;

  miniWinningConditions5.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin5 = true;
    console.log("LOCAL WINNER 5");
    }
  });

  return winner;
}

function getLocalWinner6(e){
  let winner = false;

  miniWinningConditions6.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin6 = true;
    console.log("LOCAL WINNER 6");
    }
  });

  return winner;
}

function getLocalWinner7(e){
  let winner = false;

  miniWinningConditions7.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin7 = true;
    console.log("LOCAL WINNER 7");
    }
  });

  return winner;
}

function getLocalWinner8(e){
  let winner = false;

  miniWinningConditions8.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin8 = true;
    console.log("LOCAL WINNER 8");
    }
  });

  return winner;
}

function getLocalWinner9(e){
  let winner = false;

  miniWinningConditions9.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

    winner = board[condition[0]];
    localWin9 = true;
    console.log("LOCAL WINNER 9");
    }
  });

  return winner;
}

function getOverallWinner(){
  let winner = false;

  if (
    (localWin1 === "X" && localWin2 === "X" && localWin3 === "X") ||
    (localWin4 === "X" && localWin5 === "X" && localWin6 === "X") ||
    (localWin7 === "X" && localWin8 === "X" && localWin9 === "X") ||
    (localWin1 === "X" && localWin4 === "X" && localWin7 === "X") ||
    (localWin2 === "X" && localWin5 === "X" && localWin8 === "X") ||
    (localWin5 === "X" && localWin6 === "X" && localWin9 === "X") ||
    (localWin1 === "X" && localWin5 === "X" && localWin9 === "X") ||
    (localWin3 === "X" && localWin5 === "X" && localWin7 === "X")
  ) {
    overallWin = "X";
    console.log(overallWin + " is the ultimate winner!");
    win = true;
    winner = "X";
  } else if (
    (localWin1 === "O" && localWin2 === "O" && localWin3 === "O") ||
    (localWin4 === "O" && localWin5 === "O" && localWin6 === "O") ||
    (localWin7 === "O" && localWin8 === "O" && localWin9 === "O") ||
    (localWin1 === "O" && localWin4 === "O" && localWin7 === "O") ||
    (localWin2 === "O" && localWin5 === "O" && localWin8 === "O") ||
    (localWin5 === "O" && localWin6 === "O" && localWin9 === "O") ||
    (localWin1 === "O" && localWin5 === "O" && localWin9 === "O") ||
    (localWin3 === "O" && localWin5 === "O" && localWin7 === "O")
  ) {
    overallWin = "O";
    console.log(overallWin + " is the OVERALL WINNER");
    win = true;
    winner = "O";
  } else {}

  return winner;
}
