import type { NextPage } from "next";
import Image from "next/image";
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

  const [countWords, setCountWords] = useState<number>(0);
  const [calcPrice, setCalcPrice] = useState<number>();
  const baseFee = "0.25";

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

  const [perWord, setPerWord] = useState<boolean>(false);
  const handlePricePerWord = () => {
    setPerWord(!perWord);
  };

  const [totalPay, setTotalPay] = useState<boolean>(false);
  const handleTotalPay = () => {
    setTotalPay(!totalPay);
  };

  return (
    <div style={{ height: "100%" }}>
      <div className={styles.boardOrderBox}>
        <div className={styles.boardOrderTitle}>Order Details</div>
        <div className={styles.boardOrderDetail}>
          <div className={styles.boardOrderOption}>
            <div className={styles.boldText}>Total length</div>
            <div>
              {countWords} {countWords > 1 ? "words" : "word"}
            </div>
          </div>
          {countWords < 51 && (
            <div className={styles.boardOrderOption}>
              <div className={styles.boldText}>Base Fee</div>
              <div>$0.25</div>
            </div>
          )}
          <div className={styles.boardOrderOption}>
            <div className={styles.boldText}>
              Price per word
              <div className={styles.infoIcon} onClick={handlePricePerWord}>
                <Image src="/svg/info.svg" alt="info" width={14} height={14} />
                {perWord && (
                  <div className={styles.infoText}>Up to 50 words: FREE !</div>
                )}
              </div>
            </div>
            <div>$0.05</div>
          </div>
        </div>
      </div>
      <div className={styles.boardResultOption}>
        <div className={styles.boldText}>
          Total Payment
          <div className={styles.infoIcon} onClick={handleTotalPay}>
            <Image src="/svg/info.svg" alt="info" width={14} height={14} />
            {totalPay && (
              <div className={styles.infoText}>
                Total length × Price per word
              </div>
            )}
          </div>
        </div>
        <div className={styles.resultPaymentText}>
          ${countWords > 50 ? calcPrice : baseFee}
        </div>
      </div>
    </div>
  );
};

export default BoardOrderDetail;
