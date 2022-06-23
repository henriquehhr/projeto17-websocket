import express, {json} from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import db from "./db.js";

const app = express();
dotenv.config();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Websocket server is running");
});

const teste = await db.query("SELECT * FROM users WHERE id = 6");

console.log(teste.rows[0].userName);
