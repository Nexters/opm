import { UserInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import styles from "../../../styles/Board.module.scss";

import ChatView from "./ChatView";
import DescriptionTop from "./DescriptionTop";

const DescriptionAndChat: FunctionComponent = () => {
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  return (
    <div className={styles.sideContainer}>
      <DescriptionTop />
      <ChatView />
    </div>
  );
};

export default DescriptionAndChat;
