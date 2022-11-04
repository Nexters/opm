import dotEnv from "dotenv";
import { Server } from "socket.io";

import { getServer, runMongo } from "./helpers/server";
import { isLiveServer, PORT } from "./models/constant";
import { runSocket } from "./socket/event";

dotEnv.config();
const opmServer = getServer();
opmServer.listen(PORT, () => {
  console.info(
    `${
      isLiveServer ? "LIVE" : "LOCAL"
    } Server is running... Listening on port ${PORT}`,
  );
  const io = new Server(opmServer, { cors: { origin: "*" } });
  runSocket(io);
  runMongo();
});

export default opmServer;
