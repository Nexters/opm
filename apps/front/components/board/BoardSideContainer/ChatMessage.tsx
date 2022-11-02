import { FunctionComponent } from "react";
import { MessageSocket } from "opm-models";

import { parseISO } from "../../../helpers/date";
import styles from "../../../styles/Side.module.scss";

interface ChatMessageProps {
  message: MessageSocket;
  userId: string;
}

const ChatMessage: FunctionComponent<ChatMessageProps> = (props) => {
  const { message, userId } = props;
  const { textBody, timestamp, from, type } = message;
  const myChat = from === userId;
  const system = type === "SYSTEM";

  return (
    <div
      className={`${
        myChat ? styles.messageContainerMy : styles.messageContainer
      }`}
    >
      {myChat && (
        <div className={styles.messageTimestamp}>{parseISO(timestamp)}</div>
      )}
      {system ? (
        <div className={styles.messageSystem}>{textBody}</div>
      ) : (
        <div className={myChat ? styles.messageBoxMy : styles.messageBox}>
          {textBody}
        </div>
      )}
      {!myChat && !system && (
        <div className={styles.messageTimestamp}>{parseISO(timestamp)}</div>
      )}
    </div>
  );
};

export default ChatMessage;
