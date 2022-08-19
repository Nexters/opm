import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const EditButtonGroup: FunctionComponent<{
  onEditingButtonClick: () => void;
}> = ({ onEditingButtonClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.acceptButton} onClick={onEditingButtonClick}>
        Edit
      </div>
      <div className={styles.completionButton}>Completion</div>
    </div>
  );
};

export default EditButtonGroup;
