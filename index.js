const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

//import db from "./db.js";

app.use(cors());
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });


/*const express = require("express");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 300;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);*/

io.on("connect", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("recebi uma mensagem: ", data);
    io.emit("receive-message", data);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Websocket server is running");
});

//const teste = await db.query("SELECT * FROM users WHERE id = 6");

//console.log(teste.rows[0].userName);
