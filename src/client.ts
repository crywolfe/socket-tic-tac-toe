import {io} from 'socket.io-client'
import {getCurrentBoard} from './board'
import {getPlayers, setPlayers, Symbol} from './players'

const readcommand = require('readcommand');

let sigints = 0;

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

  console.log(`Received move: ${JSON.stringify(args)}`);
  socket.emit('make.move', {"player": args[0], "pos": args[1]})
  // socket.emit('game.over', null)
  // console.log({inClient: getCurrentBoard()})

  return next();
});

const socket = io("http://localhost:5050")

socket.on("connect", () => {
  console.log(`Welcome Player`);
  console.log(socket.id)
});

socket.on("game.begin", () => {
  console.log("BEGIN!")
  console.log('Beginning Board', getCurrentBoard())
})


// socket.on("game.end", (data) => {
//   console.log("End game");
//   console.log({data})
// });

socket.on("made.move", (data) => {
  console.log(`${getPlayers().get(socket.id)?.symbol} made a move`);
  console.log({currentBoard: data.board, players: data.players})
  if (data.isGameOver) {
    console.log("GAME IS OVER!!!")
    console.log({data})
    // socket.emit('game.end', data)
  }
});

socket.on("player.disconnect", (id) => {
  console.log(`player disconnected with id: ${id}`);
});

