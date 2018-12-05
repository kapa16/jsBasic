/*jslint node: true */
"use strict";

/**
 * Класс для создания фигур
 */
class Figure {
  /**
   * Конструктор фигуры
   * @param {int} symbolCode - код сивола для отображения фигуры
   * @param {string} position - позиция фигуры на доске
   * @param {string} color - цвет фигуры / на будущее
   * @param {string} type - тип фигуры / на будущее
   */
  constructor(symbolCode, position, color, type) {
    this.symbolCode = symbolCode;
    this.position = position;
    this.color = color;
    this.type = type;
  }

  /**
   * Выводит фигуру в элемент HTML
   * @param {object} elem - элемент HTML
   */
  show(elem) {
    console.log(this);
    elem.textContent = String.fromCharCode(this.symbolCode);
  }
}

/**
 * Класс управления игрой
 */
class Game {

  /**
   * Конструктор класса игры
   * @param {array} figures - массив с фигурами
   */
  constructor() {
    this.figures = [];
  }

  /**
   * Инициализация игры: распределение позиций фигур для начала
   */
  init() {
    for (let row = 0; row < 8; row++) {
      if (row === 3) {
        row = 5;
        continue;
      }

      let diffCode = 0;
      let color = 'black';
      if (row === 0 || row === 1) {
        diffCode = 6;
        color = 'white';
      }

      if (row === 0 || row === 7) {
        this.figures.push(new Figure(9820 - diffCode, `a${row + 1}`, color, 'rook'));
        this.figures.push(new Figure(9820 - diffCode, `h${row + 1}`, color, 'rook'));
        this.figures.push(new Figure(9822 - diffCode, `b${row + 1}`, color, 'knight'));
        this.figures.push(new Figure(9822 - diffCode, `g${row + 1}`, color, 'knight'));
        this.figures.push(new Figure(9821 - diffCode, `c${row + 1}`, color, 'bishop'));
        this.figures.push(new Figure(9821 - diffCode, `f${row + 1}`, color, 'bishop'));
        this.figures.push(new Figure(9819 - diffCode, `d${row + 1}`, color, 'queen'));
        this.figures.push(new Figure(9818 - diffCode, `e${row + 1}`, color, 'king'));
      }

      if (row === 1 || row === 6) {
        for (let col = 0; col < 8; col++) {
          const letter = String.fromCharCode(97 + col);
          this.figures.push(new Figure(9823 - diffCode, `${letter}${row + 1}`, color, 'pawn'));
        }
      }
    }
  }

  /**
   * Вывод фигур на доску
   */
  showFigures() {
    const figures = this.figures;
    for (let i = 0; i < figures.length; i++) {
      const elem = document.getElementById(figures[i].position);
      figures[i].show(elem);
    }
  }

}

const newGame = new Game();
newGame.init();
newGame.showFigures();
