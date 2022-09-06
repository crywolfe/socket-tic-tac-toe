import {Server} from 'socket.io'
import {isGameWon, makeMove} from './game'
import {players, setPlayers, Symbol} from './players'

const port = 5050
const io = new Server(port)
console.log(`Socket server is listening on port ${port}`)

io.on("connect", (socket) => {
  let id = socket.id

  if (players.size === 1) {
    setPlayers(id, Symbol.O)

  } else {
    setPlayers(id, Symbol.X)
  }

  const serializedPlayers = JSON.stringify(Array.from(players.entries()))
  console.log({serializedPlayers})


  if (players.size === 2) {
    io.emit('game.begin', serializedPlayers)
  }

  socket.on("disconnect", (reason) => {
    console.log(`A client disconnected, reason: ${reason}`);
    console.log("Number of clients: %d", io.engine.clientsCount);
    players.delete(socket.id)
    console.log(players)
    socket.broadcast.emit('player.disconnect', socket.id)
  });

  socket.on("make.move", (data) => {
    let data2 = {
      playerSymbol: data.player,
      board: makeMove(data.pos, data.player),
      isGameOver: isGameWon(),
    }

    if (data2.isGameOver) {
      io.emit('game.end', data2)
    }
    io.emit('made.move', data2)
  });

  socket.on("game.resigned", (data) => {
    io.emit('game.end', data)
  })

})

