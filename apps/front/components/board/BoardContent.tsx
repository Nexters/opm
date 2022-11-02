import { BoardInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import styles from "../../styles/Board.module.scss";

interface BoardContentProps {
  originText: string;
  editedText: string;
}

const BoardContent: FunctionComponent<BoardContentProps> = ({
  originText,
  editedText,
}) => {
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  return (
    <div className={styles.textBox}>
      {board.aStatus !== "INIT" ? editedText : originText}
    </div>
  );
};

export default BoardContent;
