import { BoardInfo } from "opm-models";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import styles from "../../../styles/Side.module.scss";

const DescriptionTop = () => {
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  return (
    <div className={styles.descriptionTopContainer}>
      {board && (
        <div className={styles.descriptionTopBox}>
          <div>Category: {board.aCategory && board.aCategory}</div>
          <div>
            Description: <br /> {board.aDescription && board.aDescription}
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionTop;
