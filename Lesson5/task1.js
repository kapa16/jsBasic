/*jslint node: true */
"use strict";

/**
 * Класс представляет доску для игры
 */
class Board {

  /**
   * Конструктор доски, с заданием размеров игрового поля
   * @param {int} sizeRows - количество строк
   * @param {int} sizeY - количество колонок
   */
  constructor(sizeRows, sizeCols) {
    this.sizeRows = sizeRows;
    this.sizeCols = sizeCols;
    this.playingField = [];
  }

  /**
   * Отрисовывает доску
   * @param {object} elemBoard - HTML элемент <table>, в котором будет рисоваться доска
   */
  render(elemBoard) {
    const sizeRows = this.sizeRows;
    const sizeCols = this.sizeCols;

    for (let row = 0; row < sizeRows + 2; row++) {

      const tableRow = document.createElement('tr');
      elemBoard.appendChild(tableRow);

      const arrCells = [];

      for (let col = 0; col < sizeCols + 2; col++) {
        const cell = document.createElement('td');

        tableRow.appendChild(cell);

        if (needSymbol(row, col, sizeRows, sizeCols)) {
          cell.textContent = String.fromCharCode(96 + col);
        } else if (needSymbol(col, row, sizeRows, sizeCols)) {
          cell.textContent = sizeRows - row + 1;
        }

        if (row === 0 || col === 0 || row === sizeRows + 1 || col === sizeCols + 1) {
          continue;
        }

        cell.setAttribute('id', `${String.fromCharCode(96 + col)}${sizeRows - row + 1}`);
        arrCells.push(cell);

        cell.classList.add('main-field');

        if (((row % 2 === 0) && (col % 2)) || ((row % 2) && (col % 2 === 0))) {
          cell.classList.add('black');
        }
      }
      if (row === 0 || row === sizeRows + 1) {
        continue;
      }
      this.playingField.push(arrCells);
    }

    /**
     * Возвращает истину, если обрабатываются крайние строки или колонки, где нужно выводить буквы и цифры
     * @param {int} row - номер строки
     * @param {int} col - номер колонки
     * @param {int} sizeX - количество строк на доске
     * @param {int} sizeY - количество колонок на доске
     * @returns {boolean}
     */
    function needSymbol(row, col, sizeX, sizeY) {
      return (row === 0 || row === sizeX + 1) && col > 0 && col <= sizeY;
    }

  }
}

const chessBoard = new Board(8, 8);
const elemBoard = document.getElementById('chessBoard');
chessBoard.render(elemBoard);
