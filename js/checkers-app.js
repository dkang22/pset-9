///////////////////// CONSTANTS /////////////////////////////////////


///////////////////// APP STATE (VARIABLES) /////////////////////////


///////////////////// CACHED ELEMENT REFERENCES /////////////////////


///////////////////// EVENT LISTENERS ///////////////////////////////


///////////////////// FUNCTIONS /////////////////////////////////////
window.onload = function() {
  document.getElementById("myCanvas").onload = loadBoard;
}

const loadBoard = function () {
  let canvas = document.getElementById("myCanvas");
  let context = canvas.getContext("2d");

  for (x=0; x < 8; x++) {
    for(y=0; y < 8; y++) {
      context.moveTo(0, 70*y);
      context.lineTo(560, 70*y);
      context.stroke();

      context.moveTo(70*y, 0);
      context.lineTo(70*y, 560);
      context.stroke();

      let left = 0;
      let startX;

      for (a = 0; a < 8; a++) {
        for (b = 0; b < 8; b+=2) {
          startX = b * 70;
          if (a % 2 == 0){
            startX = (b+1) * 70;
            context.fillRect(startX + left, (a*70), 70, 70);
          }
        }
      }
    }
  }
}
