import type { NextPage } from "next";
import { BoardApiPath, BoardInfo } from "opm-models";
import { useEffect, useState } from "react";

import { Api } from "../../helpers/api";
import styles from "../../styles/Home.module.scss";

import EditCard from "./EditCard";

const EditCardList: NextPage = () => {
  const [boardList, setBoardList] = useState<BoardInfo[]>([]);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const res = await Api.get(BoardApiPath.all);
        const { data } = await res.json();
        setBoardList(data);
      } catch (e) {
        console.error(e);
      }
    };
    apiCall();
  }, []);

  return (
    <div className={styles.editingList}>
      <div className={styles.editingListTitle}>
        Contents waiting for editing.
      </div>
      <div className={styles.editingListContainer}>
        <>
          {boardList?.map((board) => {
            return <EditCard key={board.aId} {...board} />;
          })}
          <div className={styles.loadingText}>Now loading ...</div>
        </>
      </div>
    </div>
  );
};

export default EditCardList;
