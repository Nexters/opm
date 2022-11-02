import { BoardInfo, UserApiPath, UserInfo } from "opm-models";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import { Api } from "../../../helpers/api";
import styles from "../../../styles/Side.module.scss";

const NameCard = () => {
  const board = useSelector<RootState, BoardInfo>((state) => state.board);
  const [editor, setEditor] = useState<UserInfo>();

  useEffect(() => {
    const setEditorInfo = async () => {
      if (!board.eId) {
        return;
      }

      const res = await Api.post(UserApiPath.getEditorInfo, { eId: board.eId });
      if (res.ok) {
        const { data } = await res.json();
        setEditor(data);
      }
    };
    setEditorInfo();
  }, [board.eId]);

  return (
    <div className={styles.nameCardContainer}>
      {editor ? (
        <>
          <div className={styles.nameCardInName}>
            Editor: {`${editor?.uFirstName} ${editor?.uLastName}`}
          </div>
          <div>
            {editor.uProfileInfo.educations[0].nameOfSchool} in{" "}
            {editor.uProfileInfo.educations[0].degree}{" "}
          </div>
          <div>{editor.uProfileInfo.educations[0].major}</div>
        </>
      ) : (
        <div>Waiting for the editor...</div>
      )}
    </div>
  );
};

export default NameCard;
