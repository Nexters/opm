import { BoardInfo } from "opm-models";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import styles from "../../../styles/Side.module.scss";

const Description = () => {
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.descriptionInName}>About post</div>
      {board && (
        <div className={styles.descriptionBox}>
          <div className={styles.editingCardCreateDate}>
            Create Date:{" "}
            {board.aCreateDate && board.aCreateDate.substring(0, 10)}
          </div>
          <div>Category: {board.aCategory && board.aCategory}</div>
          <div>
            Description: <br /> {board.aDescription && board.aDescription}
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
