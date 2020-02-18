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

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
//document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  turn = "X";
  render();
}

function render() {
  board.forEach(function(mark, index) {
    console.log(squares[index]);
    squares[index].textContext = mark;
  });
}

function takeTurn(e) {
  let index = squares.findIndex(function(square) {
    return square === e.target;
  });

  board[index] = turn;
  turn = turn === "X" ? "O" : "X";

  render();
}
