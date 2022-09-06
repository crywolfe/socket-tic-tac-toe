import {Symbol} from './players'

export const board: string[] = ['.', '.', '.', '.', '.', '.', '.', '.', '.']

export const getCurrentBoard = () => {
  return `
  ${board[0]} ${board[1]} ${board[2]}
  ${board[3]} ${board[4]} ${board[5]}
  ${board[6]} ${board[7]} ${board[8]}
`
}

export const setCurrentBoard = (pos: number, player: Symbol) => {
  board[pos - 1] = String(player)
}