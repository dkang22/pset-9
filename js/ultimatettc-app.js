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
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
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
  let index = squares.findIndex(function(square) {
    return square === e.target;
  });

  if (board[index] !== "X" || board[index] !== "O" ) {
    board[index] = turn;
    turn = turn === "X" ? "O" : "X";
    localWin = getLocalWinner();
  }

  if(localWin) {
    let bigIndex = Math.floor((index/10));
    squares[bigIndex].textContent = "X";
  }

  render();
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
    console.log("WINNER");
    }
  });

  return winner;
}
