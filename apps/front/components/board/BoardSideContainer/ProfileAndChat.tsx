import { UserInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import styles from "../../../styles/Board.module.scss";

import NameCard from "./NameCard";
import ChatView from "./ChatView";

const ProfileAndChat: FunctionComponent = () => {
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  return (
    <div className={styles.sideContainer}>
      <NameCard />
      <ChatView />
    </div>
  );
};

export default ProfileAndChat;
