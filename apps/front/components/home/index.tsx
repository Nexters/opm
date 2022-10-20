import { FunctionComponent } from "react";

import styles from "../../styles/Home.module.scss";

const HomeBody: FunctionComponent = () => {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.introduction}>
        <h1 className={styles.mainText}>English proofreading for</h1>
        <h1 className={styles.mainText}>
          Writers, Students, Business, and You.
        </h1>
        <h3 className={styles.description}>
          Editing services for everyone who needs revision for language errors.
        </h3>
      </div>
      <video
        src="/cover.mp4"
        className={styles.videoSection}
        autoPlay
        muted
        loop
      />
    </div>
  );
};

export default HomeBody;
