import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

const InfoHeader: FunctionComponent = () => {
  return (
    <div>
      <div className={styles.title}>Editing Request.</div>
      <div className={styles.description}>
        Submit your request and an additional message for editing/proofreading.
      </div>
    </div>
  );
};

export default InfoHeader;
