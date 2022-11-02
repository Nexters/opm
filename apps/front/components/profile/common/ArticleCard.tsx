import { BoardInfo } from "opm-models";
import { FunctionComponent } from "react";

import styles from "../../../styles/Profile.module.scss";

import RightButton from "./RightButton";

interface ArticleCardProps extends BoardInfo {
  onArticleClick: (aId: string) => void;
}

const formatDate = (date: string) => {
  return date.substring(0, 10);
};

const ArticleCard: FunctionComponent<ArticleCardProps> = ({
  aId,
  onArticleClick,
  aCategory,
  aCreateDate,
  aStatus,
  aDescription,
}) => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.editingCard} onClick={() => onArticleClick(aId)}>
        <div className={styles.editingCardTitleContainer}>
          <div className={styles.editingCardTitle}>{aCategory}</div>
          {aStatus === "COMPLETE" && (
            <div className={styles.editingCardCompleteText}>complete</div>
          )}
        </div>
        <div className={styles.editingCardDescription}>
          {aDescription ? aDescription : "No additional request"}
        </div>
        <div className={styles.editingCardCreateDate}>
          {formatDate(aCreateDate)}
        </div>
      </div>
      <RightButton />
    </div>
  );
};

export default ArticleCard;
