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

  const [viewStatus, setViewStatus] = useState<Boolean>(false);
  const handleViewStatus = () => {
    setViewStatus(!viewStatus);
  };

  const categoryList = [
    "All",
    "Story Writing",
    "Summary Writing",
    "Essays",
    "Admissions/Applications",
    "Business",
    "Academic Writing",
    "Assignments",
    "Other Writings",
  ];
  const [category, setCategory] = useState<number>(0);
  const [categoryDrop, setCategoryDrop] = useState<Boolean>(false);
  const handleCategory = (i: number) => {
    setCategoryDrop(!categoryDrop);
    if (i !== -1) {
      setCategory(i);
    }
  };

  return (
    <div className={styles.editingList}>
      <div className={styles.editingListTitle}>
        Contents waiting for editing.
      </div>
      <div className={styles.categoryTitle}>
        <div>
          Category &gt;{" "}
          <span
            className={styles.categoryFilterDropBox}
            onClick={() => handleCategory(-1)}
          >
            {categoryList[category]}
            {categoryDrop && (
              <div className={styles.categoryFilterDropdown}>
                {categoryList.map((category, i) => (
                  <div key={i} onClick={() => handleCategory(i)}>
                    {category}
                  </div>
                ))}
              </div>
            )}
          </span>
        </div>
        <label className={styles.waitingCheckbox} onClick={handleViewStatus}>
          <input type="checkbox" name="waitingStatus" value="hi" />
          <span>View only WAITING</span>
        </label>
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
