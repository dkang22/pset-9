///////////////////// CONSTANTS /////////////////////////////////////
const winningConditionsOverall = [
  [0, 10, 20],
  [30, 40, 50],
  [60, 70, 80],
  [0, 30, 60],
  [10, 40, 70],
  [20, 50, 80],
  [0, 40, 80],
  [20, 40, 60]
];

const miniWinningConditions = [
  //minibox 1
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
  //minibox 2
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19],
  [11, 14, 17],
  [12, 15, 18],
  [13, 16, 19],
  [11, 15, 19],
  [13, 15, 17],
  //minibox 3
  [21, 22, 23],
  [24, 25, 26],
  [27, 28, 29],
  [21, 24, 27],
  [22, 25, 28],
  [23, 26, 29],
  [21, 25, 29],
  [23, 25, 27],
  //minibox 4
  [31, 32, 33],
  [34, 35, 36],
  [37, 38, 39],
  [31, 34, 37],
  [32, 35, 38],
  [33, 36, 39],
  [31, 35, 39],
  [33, 35, 37],
  //minibox 5
  [41, 42, 43],
  [44, 45, 46],
  [47, 48, 49],
  [41, 44, 47],
  [42, 45, 48],
  [43, 46, 49],
  [41, 45, 49],
  [43, 45, 47],
  //minibox 6
  [51, 52, 53],
  [54, 55, 56],
  [57, 58, 59],
  [51, 54, 57],
  [52, 55, 58],
  [53, 56, 59],
  [51, 55, 59],
  [53, 55, 57],
  //minibox 7
  [61, 62, 63],
  [64, 65, 66],
  [67, 68, 69],
  [61, 64, 67],
  [62, 65, 68],
  [63, 66, 69],
  [61, 65, 69],
  [63, 65, 67],
  //minibox 8
  [71, 72, 73],
  [74, 75, 76],
  [77, 78, 79],
  [71, 74, 77],
  [72, 75, 78],
  [73, 76, 79],
  [71, 75, 79],
  [73, 75, 77],
  //minibox 9
  [81, 82, 83],
  [84, 85, 86],
  [87, 88, 89],
  [81, 84, 87],
  [82, 85, 88],
  [83, 86, 89],
  [81, 85, 89],
  [83, 85, 87],
]

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let overallWin;
let localWin;

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

//  message.textContent = win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!overallWin) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (squares[index].textContent !== "X" && squares[index].textContent !== "O") {
      board[index] = turn;

      localWin = getLocalWinner(e);
      overallWin = getOverallWinner();

      turn = turn === "X" ? "O" : "X";
    }

    if(localWin) {
      let bigIndex = Math.floor((index/10));
      if (bigIndex !== 0) {
        bigIndex = bigIndex * 10;
      }
      turn = turn === "X" ? "O" : "X";
      squares[bigIndex].textContent = turn;

    }
    render();
  }
}

function getLocalWinner(e){
  let winner = null;

  miniWinningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

      winner = board[condition[0]];
/*
    let index = squares.findIndex(function(square) {
        return square === e.target;
    });

    let bigIndex = Math.floor((index/10));
    if (bigIndex !== 0) {
      bigIndex = bigIndex * 10;
    }

    console.log(bigIndex);
    winner = squares[bigIndex];
    console.log(winner);
  //  console.log(squares[bigIndex]);
*/
    console.log("LOCAL WINNER");
    }
  });

  return winner;
}

function getOverallWinner(){
  let winner = null;

  winningConditionsOverall.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[0]] === board[condition[2]]
    ){
      winner = board[condition[0]];
      console.log("OVERALL WINNER");
    }
  });

  //return winner ? winner : board.includes("") ? null : "T";
}
