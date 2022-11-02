import type { NextPage } from "next";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { MessageSocket, SocketPath, Url, UserInfo } from "opm-models";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { ErrorMessage } from "../../../helpers/error";
import styles from "../../../styles/Side.module.scss";
import { RootState } from "../../../store";

import ChatMessage from "./ChatMessage";

const ChatView: NextPage = () => {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket>();
  const [chatList, setChatList] = useState<MessageSocket[]>([]);
  const chatListRef = useRef<HTMLDivElement>(null);
  const user = useSelector<RootState, UserInfo>((state) => state.user);

  const { id: aId } = router.query;

  useEffect(() => {
    const socketClient = io(
      process.env.NODE_ENV === "production"
        ? Url.REAL_SOCKET
        : Url.LOCAL_SOCKET,
      { transports: ["websocket"] },
    );
    setSocket(socketClient);
  }, []);

  useEffect(() => {
    if (!socket || !user.uId) return;
    socket.on(SocketPath.CONNECT, () => {
      socket.emit(SocketPath.ROOM_DATA, {
        aId,
        uId: user.uId,
      });
    });
    socket.on(SocketPath.MESSAGE, (data: MessageSocket) => {
      setChatList((prev) => [...prev, data]);
    });

    return () => {
      if (!socket) return;
      socket.emit(SocketPath.END, { aId, uId: user.uId });
      socket.disconnect();
    };
  }, [socket, aId, user]);

  useEffect(() => {
    if (!chatListRef.current || chatList.length === 0) {
      return;
    }
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [chatList, chatListRef]);

  const handleTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const { key } = event;
    const text = event.target.value;
    if (key !== "Enter") {
      return;
    }
    if (text.length === 0) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    if (!socket) {
      throw new Error(ErrorMessage.SOCKET_CLOSED);
    }
    const message: MessageSocket = {
      // @ts-ignore
      aId,
      from: user.uId,
      type: "NORMAL",
      timestamp: new Date().toISOString(),
      textBody: text,
    };
    socket.emit(SocketPath.MESSAGE, message);
    event.target.value = "";
  };

  return (
    <div className={styles.container}>
      <div ref={chatListRef} className={styles.bubbleContainer}>
        {chatList.map((chat) => (
          <ChatMessage key={chat.messageId} message={chat} userId={user.uId} />
        ))}
      </div>
      <div className={styles.inputContainer}>
        <textarea
          onKeyDown={handleTextAreaKeyDown}
          className={styles.chatInput}
          placeholder="Please Enter Your Message"
        />
      </div>
    </div>
  );
};

export default ChatView;
