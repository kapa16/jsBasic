/*jslint node: true */
"use strict";

/**
 * Класс представляет доску для игры
 */
class Board {

  /**
   * Конструктор доски, с заданием размеров игрового поля
   * @param {int} sizeX - количество строк
   * @param {int} sizeY - количество колонок
   */
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.playingField = [];
  }

  /**
   * Отрисовывает доску
   * @param {object} elemBoard - HTML элемент <table>, в котором будет рисоваться доска
   */
  render(elemBoard) {
    const sizeX = this.sizeX;
    const sizeY = this.sizeY;

    for (let row = 0; row < sizeX + 2; row++) {

      const tableRow = document.createElement('tr');
      elemBoard.appendChild(tableRow);

      const arrCells = [];

      for (let col = 0; col < sizeY + 2; col++) {
        const cell = document.createElement('td');

        tableRow.appendChild(cell);

        if (needSymbol(row, col, sizeX, sizeY)) {
          cell.textContent = String.fromCharCode(96 + col);
        } else if (needSymbol(col, row, sizeX, sizeY)) {
          cell.textContent = sizeX - row + 1;
        }

        if (row === 0 || col === 0 || row === sizeX + 1 || col === sizeY + 1) {
          continue;
        }

        arrCells.push(cell);

        cell.classList.add('main-field');

        if (((row % 2 === 0) && (col % 2)) || ((row % 2) && (col % 2 === 0))) {
          cell.classList.add('black');
        }
      }
      if (row === 0 || row === sizeX + 1) {
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
