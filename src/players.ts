
export enum Symbol {
  X = 'X',
  O = 'O'
}

export interface Player {
  symbol: Symbol
  id: string
  otherPlayerId?: string
}

export const players = new Map<string, Player>()

export const getPlayers = () => {
  return players
}

export const setPlayers = (id: string, symbol: Symbol) => {
  const player: Player = {
    symbol: symbol,
    id
  }
  players.set(id, player)
}
