import {io} from 'socket.io-client'
import {getCurrentBoard} from './board'
import {Player} from './players'

const readcommand = require('readcommand');

let sigints = 0;
let deserializedPlayers = new Map<string, Player>()

readcommand.loop( (err: { code: string; }, args: any, str: any, next: () => any) => {
  if (err && err.code !== 'SIGINT') {
    throw err;
  } else if (err) {
    if (sigints === 1) {
      process.exit(0);
    } else {
      sigints++;
      console.log('Press ^C again to exit.');
      return next();
    }
  } else {
    sigints = 0;
  }
  if (args[0] === 'r') {
    socket.emit('game.resigned', {"resigned": args[0]})

  } else {
    socket.emit('make.move', {"player": args[0], "pos": parseInt(args[1])})
  }

  return next();
});

const socket = io("http://localhost:5050")

socket.on("connect", () => {
  console.log(`Welcome Player`);
  console.log(socket.id)
});

socket.on("game.begin", (data) => {
  console.log("BEGIN!")
  deserializedPlayers = new Map(JSON.parse(data))
  console.log({data, deserializedPlayers})
  console.log('Beginning Board', getCurrentBoard())
})


socket.on("game.end", (data) => {
  console.log("End game");
  if (data.resigned === 'r') {
    console.log('Game won by [first | second] player due to resignation')
  }
});

socket.on("made.move", (data) => {
  console.log(`${data.playerSymbol} made a move`);
  console.log(data);
  console.log(data.board)
  if (data.isGameOver) {
    console.log(`Game won by ${data.playerSymbol} player`)
  }

  // Tie
  if (!data.board.includes('.')) {
    console.log('Game is tied.')
  }
});

socket.on("player.disconnect", (id) => {
  console.log(`player disconnected with id: ${id}`);
});
