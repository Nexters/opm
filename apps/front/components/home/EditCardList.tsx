import type { NextPage } from "next";
import { BoardApiPath, BoardInfo } from "opm-models";
import React, { useEffect, useState } from "react";

import { Api } from "../../helpers/api";
import styles from "../../styles/Home.module.scss";

import EditCard from "./EditCard";

const EditCardList: NextPage = () => {
  const [boardList, setBoardList] = useState<BoardInfo[]>([]);
  const [boardMoreBtn, setBoardMoreBtn] = useState<boolean>(true);

  const [viewStatus, setViewStatus] = useState<Boolean>(false);
  const [waitingBoardList, setWaitingBoardList] = useState<BoardInfo[]>([]);

  useEffect(() => {
    const apiCall = async () => {
      try {
        // TODO: category!!  Api.get(`${BoardApiPath.one}?aId=${pathAid}`);
        const res = await Api.get(BoardApiPath.all);
        const { data } = await res.json();
        setBoardList(data);
        if (data.length !== 20) {
          setBoardMoreBtn(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    apiCall();
  }, []);

  const handleMore = async () => {
    try {
      const lastBoardAId = boardList[boardList.length - 1].aId;
      const res = await Api.get(`${BoardApiPath.all}?aId=${lastBoardAId}`);
      const { data } = await res.json();
      setBoardList((boardList) => [...boardList, ...data]);
      if (data.length !== 20) {
        setBoardMoreBtn(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleViewStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViewStatus(e.target.checked);
    const filterList = boardList.filter((board) => board.aStatus === "INIT");
    setWaitingBoardList(filterList);
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
        <label className={styles.waitingCheckbox}>
          <input
            type="checkbox"
            name="waitingStatus"
            onChange={(e) => handleViewStatus(e)}
          />
          <span>View only WAITING</span>
        </label>
      </div>
      <div className={styles.editingListContainer}>
        <>
          {viewStatus
            ? waitingBoardList.map((board) => {
                return <EditCard key={board.aId} {...board} />;
              })
            : boardList?.map((board) => {
                return <EditCard key={board.aId} {...board} />;
              })}
          {boardMoreBtn && (
            <div className={styles.loadingText} onClick={handleMore}>
              Show more ...
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default EditCardList;
