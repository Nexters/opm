import { BoardInfo } from "opm-models";
import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import styles from "../../../styles/Board.module.scss";

import Description from "./Description";

const ProfileAndDescription: FunctionComponent = () => {
  const board = useSelector<RootState, BoardInfo>((state) => state.board);

  const [countWords, setCountWords] = useState<number>(0);
  const [calcPrice, setCalcPrice] = useState<number>(0);
  const baseFee = 0.25;

  useEffect(() => {
    getWordCount(board.aContent);
    if (countWords > 50) {
      calc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countWords, board.aContent]);

  const calc = () => {
    setCalcPrice(Math.round(countWords * 0.05 * 100) / 100);
  };

  const getWordCount = (str: string) => {
    if (!board.aContent) {
      setCountWords(0);
      return;
    }
    setCountWords(str.trim().split(/\s+/).length);
  };

  const calcEarnings = (num: number) => {
    return num * 0.3;
  };

  return (
    <div className={styles.sideContainer}>
      <div className={styles.feeContainer}>
        <div>
          Total length × Price per word = $
          {countWords > 50 ? calcPrice : baseFee}
        </div>
        <div>
          Editor’s earnings (30%) ={" "}
          <b>
            ${countWords > 50 ? calcEarnings(calcPrice) : calcEarnings(baseFee)}
          </b>
        </div>
      </div>
      <Description />
    </div>
  );
};

export default ProfileAndDescription;
