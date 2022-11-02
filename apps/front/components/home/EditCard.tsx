import { useRouter } from "next/router";
import { BoardInfo } from "opm-models";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { setBoard } from "../../store/slice/board";
import styles from "../../styles/Home.module.scss";

interface EditCardProps extends BoardInfo {}

const EditCard: FunctionComponent<EditCardProps> = (props) => {
  const { aId, aCategory, uId, aStatus, aDescription, aCreateDate } = props;

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleEditCardClick = () => {
    dispatch(setBoard(props));
    router.push(`/board/${aId}`);
  };

  const formatDate = (date: string) => {
    return date.substring(0, 10);
  };

  return (
    <div className={styles.editingCard} onClick={handleEditCardClick}>
      <div className={styles.editingCardTitleContainer}>
        <div className={styles.editingCardTitle}>{aCategory}</div>
        {user.uId === uId && (
          <div className={styles.editingCardIsMineText}>My request</div>
        )}
        {aStatus === "COMPLETE" && (
          <div className={styles.editingCardCompleteText}>Completed</div>
        )}
      </div>
      <div className={styles.editingCardDescription}>
        {aDescription ? aDescription : "No additional request"}
      </div>
      {/* <div className={styles.editingCardCreateDate}>
        {formatDate(aCreateDate)}
      </div> */}
    </div>
  );
};

export default EditCard;
