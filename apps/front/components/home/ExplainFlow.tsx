import { FunctionComponent } from "react";
import Image from "next/image";

import styles from "../../styles/Home.module.scss";

const ExplainFlow: FunctionComponent = () => {
  return (
    <div className={styles.editingList}>
      <h1 className={styles.explainText}>Introduce 1</h1>
      <h1 className={styles.explainText}>Introduce 2</h1>
      <div className={styles.imageContainer}>
        <div className={styles.imageBox}>
          <Image
            src="/svg/tempImage.svg"
            alt="explain flow 1"
            layout="responsive"
            width="90%"
            height="100%"
          />
        </div>
        <div className={styles.imageBox}>
          <Image
            src="/svg/tempImage.svg"
            alt="explain flow 2"
            layout="responsive"
            width="90%"
            height="100%"
          />
        </div>
        <div className={styles.imageBox}>
          <Image
            src="/svg/tempImage.svg"
            alt="explain flow 3"
            layout="responsive"
            width="90%"
            height="100%"
          />
        </div>
      </div>
      <div>
        <h3 className={styles.buttonText}>Looking at the writing</h3>
      </div>
    </div>
  );
};

export default ExplainFlow;
