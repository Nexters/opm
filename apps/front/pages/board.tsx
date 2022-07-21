import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { SocketPath, Url } from "../models";
import styles from "../styles/Home.module.scss";
import { MessageSocket } from "../types";

const Board: NextPage = () => {
  const [socketId, setSocketId] = useState<string>();
  const [message, setMessage] = useState<MessageSocket>({
    messageId: '1',
    boardId: '1',
    from: 'me',
    to: 'you',
    type: 'NORMAL',
    timestamp: '',
    textBody: 'this is message',
  });

  useEffect((): any => {
    const socket = io(Url.SOCKET, { transports: ["websocket"] });
    socket.on(SocketPath.CONNECTION, (data) => {
      setSocketId(socket.id);
      socket.emit('message', message);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>에디터에요!!!</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Socket ID: {socketId}</h1>
        <Link href="/">Back Home</Link>
      </main>
    </div>
  );
};

export default Board;
