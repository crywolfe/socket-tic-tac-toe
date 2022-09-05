import {Server} from 'socket.io'
import {isGameOver, makeMove} from './game'
import {getPlayers, players, Symbol, setPlayers} from './players'

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
  console.log({id, players: getPlayers()})

  if (players.size === 2) {
    io.emit('game.begin', getPlayers())
  }

  if (isGameOver()) {
    io.emit('game.over', getPlayers())
  }

  socket.on("disconnect", (reason) => {
    console.log(`A client disconnected, reason: ${reason}`);
    console.log("Number of clients: %d", io.engine.clientsCount);
    players.delete(socket.id)
    console.log(players)
    socket.broadcast.emit('player.disconnect', id)
  });

  socket.on("make.move", (data) => {
    data.board = makeMove(data.pos, data.player)
    data.isGameOver = isGameOver()
    console.log({players2: getPlayers()})
    data.players = getPlayers()
    if (data.isGameOver) {
      console.log({gameIsOver: data.isGameOver, players: data.players})
      io.emit('game.end', data)
    }
    io.emit('made.move', data)
  });
})

