///////////////////// CONSTANTS /////////////////////////////////////


///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;

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
   "", "B", "", "B", "", "B", "", "B",
   "B", "", "B", "", "B", "", "B", "",
   "", "B", "", "B", "", "B", "", "B",
   "", "", "", "", "", "", "", "",
   "", "", "", "", "", "", "", "",
   "W", "", "W", "", "W", "", "W", "",
   "", "W", "", "W", "", "W", "", "W",
   "W", "", "W", "", "W", "", "W", ""
 ];
 turn = "B";
 win = null;
// render();
}
