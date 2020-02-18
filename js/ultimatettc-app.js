///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;


///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const squares1 = Array.from(document.querySelectorAll("#board-1 div"));
const squares2 = Array.from(document.querySelectorAll("#board-2 div"));

///////////////////// EVENT LISTENERS ///////////////////////////////
//window.onload = init;
//document.getElementById("board").onclick = takeTurn;
//document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////
