
export enum Symbol {
  X = 'X',
  O = 'O'
}

export enum Status {
  FIRST = 'FIRST',
  SECOND = 'SECOND'
}

export interface Player {
  symbol: Symbol
  id: string
  otherPlayerId?: string
  status: Status
}

export const players = new Map<string, Player>()

export const getPlayers = () => {
  return players
}

export const setPlayers = (id: string, symbol: Symbol, status: Status) => {
  const player: Player = {
    symbol: symbol,
    id,
    status
  }
  players.set(id, player)
}
