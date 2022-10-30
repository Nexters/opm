import { FunctionComponent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../../styles/Home.module.scss";
import Footer from "../common/Footer";

const ExplainFlow: FunctionComponent = () => {
  const router = useRouter();
  const handlePosts = () => {
    router.push("/posts");
  };
  return (
    <div className={styles.explainContainer}>
      <div className={styles.editingList}>
        <h1 className={styles.explainText}>
          Affordable prices, Quality services.
        </h1>
        <h1 className={styles.explainText}>
          Native editors from English-speaking countries to help you get done
          with your work.
        </h1>
        <div className={styles.imageContainer}>
          <div className={styles.imageBox}>
            <Image
              src="/svg/tempImage.svg"
              alt="explain flow 1"
              layout="responsive"
              width="90%"
              height="70%"
            />
          </div>
          <div className={styles.imageBox}>
            <Image
              src="/svg/tempImage.svg"
              alt="explain flow 2"
              layout="responsive"
              width="90%"
              height="70%"
            />
          </div>
          <div className={styles.imageBox}>
            <Image
              src="/svg/tempImage.svg"
              alt="explain flow 3"
              layout="responsive"
              width="90%"
              height="70%"
            />
          </div>
        </div>
        <div>
          <h3 className={styles.buttonText} onClick={handlePosts}>
            Go to posts
          </h3>
        </div>
      </div>
      <div className={styles.explainFooter}>
        <Footer />
      </div>
    </div>
  );
};

export default ExplainFlow;
