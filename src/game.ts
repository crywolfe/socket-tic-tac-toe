import {board, getCurrentBoard, setCurrentBoard} from './board'
import {Symbol} from './players'

const checkMove = (pos: number): boolean => {
  if (pos < 1 || pos > 9) return false
  return board[pos - 1] === ".";
}

const win = {xs: "XXX", os: "OOO"}

export const isGameWon = (): boolean => {
  return horizontalCheck() ||
    verticalCheck() ||
    diagonalCheck()
}

const horizontalCheck = (): boolean => {
  return board[0] + board[1] + board[2] === win.xs || board[0] + board[1] + board[2] === win.os ||
    board[3] + board[4] + board[5] === win.xs || board[3] + board[4] + board[5] === win.os ||
    board[6] + board[7] + board[8] === win.xs || board[6] + board[7] + board[8] === win.os
}

const verticalCheck = (): boolean => {
  return board[0] + board[3] + board[6] === win.xs || board[0] + board[3] + board[6] === win.os ||
    board[1] + board[4] + board[7] === win.xs || board[1] + board[4] + board[7] === win.os ||
    board[2] + board[5] + board[8] === win.xs || board[2] + board[5] + board[8] === win.os
}

const diagonalCheck = (): boolean => {
  return board[0] + board[4] + board[8] === win.xs || board[0] + board[4] + board[8] === win.os ||
    board[2] + board[4] + board[6] === win.xs || board[2] + board[4] + board[6] === win.os
}

export const makeMove = (pos: number, player: Symbol): string => {
  if (checkMove(pos) && !isGameWon()) {
    setCurrentBoard(pos, player)
  }
  return getCurrentBoard()
}

