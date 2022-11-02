import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const NonValidViewerButtonGroup: FunctionComponent = () => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.blankButton}></div>
      <div style={{ margin: "auto 0" }}>This post has been edited</div>
    </div>
  );
};

export default NonValidViewerButtonGroup;
