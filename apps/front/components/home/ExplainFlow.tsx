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
        <div>
          <h1 className={styles.explainText}>
            Affordable prices, Quality services.
          </h1>
          <h1 className={styles.explainText}>
            Native editors from English-speaking countries to help you get done
            with your work.
          </h1>
        </div>
        <div className={styles.imageContainer}>
          <div>
            <Image src="/backbutton.png" alt="logo" width={40} height={40} />
          </div>
          <div className={styles.imageBox}>
            <video
              src="/home1.mp4"
              className={styles.videoSection}
              autoPlay
              muted
              loop
              width="90%"
              height="70%"
            />
          </div>
          <div style={{ width: "40%", fontWeight: "200" }}>
            <div>
              Please select a category and register your writing. <br />
              We&apos;ll match the editor to you.
            </div>
          </div>
          <div style={{ transform: "rotate(180deg)" }}>
            <Image src="/backbutton.png" alt="logo" width={40} height={40} />
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
