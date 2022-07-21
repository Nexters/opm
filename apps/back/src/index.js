const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 8080;
app.use(cors());

server.listen(PORT, (req, res) => {
  console.info(`Listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log('user connected!');

  socket.on("message", (data) => {
    console.log("client가 보낸 데이터: ", data);
    console.log(data.messageId);
  });

  socket.on("leaveUser", (nick) => {
    io.emit("out", nick);
  });
});
