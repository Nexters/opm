import { FunctionComponent } from "react";

import styles from "../../styles/Board.module.scss";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ label, onClick }) => {
  return (
    <div className={styles.nextButtonContainer}>
      <div className={styles.disableLoginBtn} onClick={onClick}>
        {label}
      </div>
    </div>
  );
};

export default Button;
