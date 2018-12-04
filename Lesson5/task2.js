/*jslint node: true */
"use strict";

const figure = {
    symbolCode: 0,

  show(elem) {
    elem.textContent = String.fromCharCode(this.symbolCode);
  }
};

class Game {

  constructor() {
    this.figuresPositions = [];
    this.figure = figure;
  }

  init() {
    for (let row = 0; row < 8; row++) {
      let arrCol = [];
      for (let col = 0; col < 8; col++) {
        arrCol.push(32);
      }
      this.figuresPositions[row] = arrCol;

      let diffCode = 0;
      if (row === 7 || row === 6) {
        diffCode = 6;
      }

      if (row === 0 || row === 7) {
        this.figuresPositions[row][0] = this.figuresPositions[row][7] = 9820 - diffCode;
        this.figuresPositions[row][1] = this.figuresPositions[row][6] = 9822 - diffCode;
        this.figuresPositions[row][2] = this.figuresPositions[row][5] = 9821 - diffCode;
        this.figuresPositions[row][3] = 9819 - diffCode;
        this.figuresPositions[row][4] = 9818 - diffCode;
      }

      if (row === 1 || row === 6) {
        for (let col = 0; col < 8; col++) {
          this.figuresPositions[row][col] = 9823 - diffCode;
        }
      }
    }
  }

  showFigures (playingField) {
    for (let row = 0; row < playingField.length; row++) {
      for (let col = 0; col < playingField[row].length; col++) {
        this.figure.symbolCode = this.figuresPositions[row][col];
        this.figure.show(playingField[row][col]);
      }

    }
  }

}

const newGame = new Game();
newGame.init();
newGame.showFigures(chessBoard.playingField);
