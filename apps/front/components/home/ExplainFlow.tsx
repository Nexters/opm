import { FunctionComponent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../../styles/Home.module.scss";
import Footer from "../common/Footer";

const ExplainFlow: FunctionComponent = () => {
  const router = useRouter();
  const handlePosts = () => {
    router.push("/posts");
  };

  const slideContainerRef = useRef<HTMLDivElement>(null);

  const slideList = [
    {
      video: "/home1.mp4",
      description:
        "Please select a category and register your writing. We'll match the editor to you.",
    },
    {
      video: "/home2.mp4",
      description:
        "Chat allows you to communicate with the editor while the text is being modified.",
    },
  ];
  const slideCount = slideList.length;

  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [slideLeft, setSlideLeft] = useState<number>(0);
  useEffect(() => {
    if (slideContainerRef.current) {
      setSlideWidth(slideContainerRef.current.clientWidth * -1);
    }
  }, []);

  const handlePrev = () => {
    if (slideLeft === 0) return;
    setSlideLeft(slideLeft - slideWidth);
  };
  const maxSlideLeft = slideWidth * (slideCount - 1);
  const handleNext = () => {
    if (slideLeft === maxSlideLeft) return setSlideLeft(0);
    setSlideLeft(slideLeft + slideWidth);
  };

  return (
    <div className={styles.explainContainer}>
      <div className={styles.editingList}>
        <div>
          <h1 className={styles.explainText}>
            Affordable prices, Quality services.
          </h1>
          <h2 className={styles.explainText}>
            Native editors from English-speaking countries to help you get done
            with your work.
          </h2>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.slideButton} onClick={handlePrev}>
            <Image src="/backbutton.png" alt="logo" width={200} height={200} />
          </div>
          <div className={styles.slideContainer} ref={slideContainerRef}>
            {slideList.map((slide) => (
              <div
                key={slide.video}
                className={styles.slideBox}
                style={{ left: slideLeft }}
              >
                <div className={styles.imageBox}>
                  <video
                    src={slide.video}
                    className={styles.videoSection}
                    autoPlay
                    muted
                    loop
                    width="90%"
                    height="70%"
                  />
                </div>
                <div
                  style={{ width: "40%", margin: "auto", fontWeight: "200" }}
                >
                  <div>{slide.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ transform: "rotate(180deg)" }} onClick={handleNext}>
            <Image src="/backbutton.png" alt="logo" width={50} height={50} />
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
