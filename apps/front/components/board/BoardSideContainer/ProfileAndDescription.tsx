import { FunctionComponent } from "react";

import styles from "../../../styles/Board.module.scss";

import NameCard from "./NameCard";
import Description from "./Description";

const ProfileAndDescription: FunctionComponent = () => {
  return (
    <div className={styles.sideContainer}>
      <NameCard />
      <Description />
    </div>
  );
};

export default ProfileAndDescription;
