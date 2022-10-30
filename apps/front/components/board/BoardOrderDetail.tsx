import type { NextPage } from "next";
import { BoardInfo } from "opm-models";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import styles from "../../styles/Board.module.scss";

interface IProps {
  content: string;
}
const BoardOrderDetail = (props: IProps) => {
  const content = props.content;
  const board = useSelector<RootState, BoardInfo>((state) => state.board);
  console.log(board);

  const [countWords, setCountWords] = useState<number>(0);
  const [calcPrice, setCalcPrice] = useState<number>();
  const baseFee = "$0.25";

  useEffect(() => {
    getWordCount(content);
    if (countWords > 50) {
      calc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countWords, content]);
  const calc = () => {
    setCalcPrice(Math.round(countWords * 0.05 * 100) / 100);
  };

  const getWordCount = (str: string) => {
    if (!content) {
      setCountWords(0);
      return;
    }
    setCountWords(str.trim().split(/\s+/).length);
  };

  return (
    <div style={{ height: "100%" }}>
      <div className={styles.boardOrderBox}>
        <div className={styles.boardOrderTitle}>Order Details</div>
        <div className={styles.boardOrderDetail}>
          <div className={styles.boardOrderOption}>
            <div className={styles.boldText}>Total Length</div>
            <div>
              {countWords} {countWords > 1 ? "words" : "word"}
            </div>
          </div>
          <div className={styles.boardOrderOption}>
            <div className={styles.boldText}>Base Fee</div>
            <div>$0.25</div>
          </div>
          <div className={styles.boardOrderOption}>
            <div className={styles.boldText}>Price per word</div>
            <div>$0.05</div>
          </div>
          {/* <div className={styles.boardOrderOption}>
            <div className={styles.boldText}>Total Payment</div>
            <div>
              {countWords > 50 ? (
                `${countWords} words × $0.05 = ${calcPrice}`
              ) : (
                <div>Basic fee of 50 words or less</div>
              )}
            </div>
          </div> */}
        </div>
      </div>
      <div className={styles.boardResultOption}>
        <div className={styles.boldText}>Total Payment</div>
        <div className={styles.resultPaymentText}>
          ${countWords > 50 ? calcPrice : baseFee}
        </div>
      </div>
    </div>
  );
};

export default BoardOrderDetail;
