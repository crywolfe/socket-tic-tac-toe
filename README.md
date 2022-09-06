### Quick Notes

I did the work using typescript.

For this reason, the easiest way to run the server and clients are as follows:

In the first terminal, run `npx ts-node src/server.ts` or `npx ts-node src/server.ts <port>`, e.g. `npx ts-node src/server.ts 5051`

In the second terminal, run `npx ts-node src/client.ts` or `npx ts-node src/client.ts <host> <port>`, e.g. `npx ts-node src/client.ts http://localhost 5051`

In the third terminal, run `npx ts-node src/client.ts` or `npx ts-node src/client.ts <host> <port>`, e.g. `npx ts-node src/client.ts http://localhost 5051`
