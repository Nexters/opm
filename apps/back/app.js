require("dotenv").config();
const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const socketIO = require("socket.io");
const io = socketIO(server);

const cors = require("cors");
app.use(cors());

const PORT = 8080;
server.listen(PORT, (req, res) => {
  console.info(`Listening on port ${PORT}`);
});

const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(require("./routes"));

io.on("connection", (socket) => {
  const roomData = {}; // TODO: DB
  console.info("server received connection!", socket.id);

  socket.on("roomData", (data) => {
    roomData.boardId = data.boardId;
    socket.emit("message", {
      boardId: roomData.boardId,
      messageId: randomUUID(),
      type: "SYSTEM",
      from: "SYSTEM",
      to: socket.id,
      timestamp: new Date().toISOString(),
      textBody: "open chatting room",
    });
  });

  socket.on("message", (data) => {
    socket.emit("message", { ...data, messageId: randomUUID() });
  });

  socket.on("disconnect", (socket) => {
    console.info("disconnect", socket);
  });
});

require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL, {
    dbName: "OPM",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => {
    console.log(err);
  });
