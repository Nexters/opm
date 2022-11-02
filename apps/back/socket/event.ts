import { randomUUID } from "crypto";

import { SocketPath, MessageSocket } from "opm-models";
import { Server } from "socket.io";

type Rooms = Record<string, string[]>;

export const runSocket = (io: Server) => {
  const rooms = {} as Rooms;

  io.on(SocketPath.CONNECT, (socket) => {
    console.info("server received connection!", socket.id);

    socket.on(SocketPath.ROOM_DATA, (data) => {
      const { aId, uId } = data;
      if (!rooms[aId]) {
        rooms[aId] = [];
      }
      // TODO: db로 체크하는게 나을듯
      // if (rooms[aId].length >= 2) {
      //   socket.emit(SocketPath.ERROR, {
      //     message: "Room 인원 초과",
      //   });
      //   return;
      // }
      socket.emit(SocketPath.MESSAGE, {
        aId,
        messageId: randomUUID(),
        type: "SYSTEM",
        from: "SYSTEM",
        to: [uId],
        timestamp: new Date().toISOString(),
        textBody: "Open Chatting Room",
      });
      rooms[aId].push(socket.id);
      socket.join(aId);
    });

    socket.on(SocketPath.MESSAGE, (data: MessageSocket) => {
      // NOTE: 나 자신한테 보냄.
      socket.emit(SocketPath.MESSAGE, { ...data, messageId: randomUUID() });

      const { aId } = data;
      const message: MessageSocket = {
        ...data,
        messageId: randomUUID(),
      };
      rooms[aId].forEach((socketId) => {
        if (socketId === socket.id) {
          return;
        }
        // NOTE: 방 유저에게 보냄
        socket.to(socketId).emit(SocketPath.MESSAGE, message);
      });
    });

    socket.on(SocketPath.END, (data) => {
      const { aId, uId } = data;
      // TODO: DB에서 제거
    });

    socket.on(SocketPath.DISCONNECT, () => {
      console.info("disconnect", socket.id);
    });
  });
};
