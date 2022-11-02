import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const NonValidEditingButtonGroup: FunctionComponent = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton}></div>
      <div style={{ margin: "auto 0" }}>
        This post is waiting for editor ...
      </div>
    </div>
  );
};

export default NonValidEditingButtonGroup;
