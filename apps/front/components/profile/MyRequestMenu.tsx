import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BoardApiPath, BoardInfo, UserInfo } from "opm-models";
import { useSelector } from "react-redux";

import styles from "../../styles/Profile.module.scss";
import { Api } from "../../helpers/api";
import { RootState } from "../../store";
import Loading from "../common/Loading";

import ArticleCard from "./common/ArticleCard";

const MyRequestMenu: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const [requestList, setRequestList] = useState<BoardInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiCall = async () => {
      const param = { uId: user.uId };
      const res = await Api.post(BoardApiPath.listByUser, param);
      if (!res.ok) {
        console.error("Something wrong...");
        return;
      }
      const { data } = await res.json();
      setRequestList(data ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 150);
    };
    apiCall();
  }, [user]);

  if (isLoading) {
    return (
      <>
        <div className={styles.title}>Your Posts.</div>
        <div className={styles.editingListContainer}>
          <Loading />
        </div>
      </>
    );
  }

  const handleArticleClick = (aId: string) => {
    router.push(`/board/${aId}`);
  };

  return (
    <>
      <div className={styles.title}>Your Posts.</div>
      {requestList && requestList.length === 0 ? (
        <div className={styles.nullText}>You never posted a request.</div>
      ) : (
        <div className={styles.editingListContainer}>
          {requestList.map((el) => (
            <ArticleCard
              key={el.aId}
              {...el}
              onArticleClick={handleArticleClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyRequestMenu;
