import { BoardInfo, UserInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";

import ProfileAndDescription from "./ProfileAndDescription";
import ProfileAndChat from "./ProfileAndChat";
import FeeAndDescription from "./FeeAndDescription";
import DescriptionAndChat from "./DescriptionAndChat";

const BoardSideContainer: FunctionComponent = () => {
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  const isEditor = user.uEditorType === "EDITOR" ? true : false;
  const isMyRequest = board.uId === user.uId;
  const isMyWork = board.eId === user.uId;

  if (board.aStatus === "INIT") {
    if (isEditor) return <FeeAndDescription />;
    if (isMyRequest) return <ProfileAndChat />;
    return <ProfileAndDescription />;
  }

  if (board.aStatus === "EDITING" || board.aStatus === "DONE") {
    if (isMyRequest) return <ProfileAndChat />;
    if (isMyWork) return <DescriptionAndChat />;
    return <ProfileAndDescription />;
  }

  return <ProfileAndDescription />;
};

export default BoardSideContainer;
