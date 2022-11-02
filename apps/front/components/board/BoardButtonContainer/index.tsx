import { BoardInfo, UserInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import { BoardPhase } from "../../../pages/board/[id]";

import CompleteButtonGroup from "./CompleteButtonGroup";
import NonValidViewerButtonGroup from "./NonValidViewerButtonGroup";
import NonValidEditingButtonGroup from "./NonValidEditingButtonGroup";
import AcceptButtonGroup from "./AcceptButtonGroup";
import SaveButtonGroup from "./SaveButtonGroup";
import CompleteCheckButtonGroup from "./CompleteCheckButtonGroup";
import WaitingButtonGroup from "./WaitingButtonGroup";
import EditButtonGroup from "./EditButtonGroup";
import NonValidButton from "./NonValidButton";

interface BoardButtonContainerProps {
  boardPhase: BoardPhase;
  onEditingButtonClick: () => void;
  onCompleteButtonClick: () => void;
  onAcceptButtonClick: () => void;
  onSaveButtonClick: () => void;
}

const BoardButtonContainer: FunctionComponent<BoardButtonContainerProps> = (
  props,
) => {
  const { boardPhase } = props;
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  const isEditor = user.uEditorType === "EDITOR" ? true : false;

  const isMyRequest = board.uId === user.uId;
  const isMyWork = board.eId === user.uId;

  if (board.aStatus === "INIT") {
    if (isEditor) return <AcceptButtonGroup {...props} />;
    if (isMyRequest) return <WaitingButtonGroup />;
    return <NonValidEditingButtonGroup />;
  }

  if (board.aStatus === "EDITING") {
    if (isMyRequest) return <WaitingButtonGroup />;
    if (isMyWork) {
      if (boardPhase === "edit") {
        return <SaveButtonGroup {...props} />;
      }
      return <EditButtonGroup {...props} />;
    }
    return <NonValidViewerButtonGroup />;
  }

  if (board.aStatus === "DONE") {
    if (isMyRequest) return <CompleteCheckButtonGroup {...props} />;
    if (isMyWork) return <WaitingButtonGroup />;
    return <NonValidViewerButtonGroup />;
  }

  if (board.aStatus === "COMPLETE") {
    return <NonValidButton />;
  }

  return <CompleteButtonGroup />;
};

export default BoardButtonContainer;
