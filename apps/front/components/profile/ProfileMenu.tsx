import type { NextPage } from "next";
import { UserInfo } from "opm-models";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import styles from "../../styles/Profile.module.scss";

const ProfileMenu: NextPage = () => {
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("placeholder");
  const [lastName, setLastName] = useState<string>("placeholder");

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.currentTarget.value);
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.currentTarget.value);

  const edit = () => {
    setIsEdit(!isEdit);
    if (!isEdit) return;
    // 수정 함수
    alert("Edited!");
  };

  return (
    <div>
      <div className={styles.title}>Account information.</div>
      <div className={styles.accountContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.subTitle}>E-mail</div>
          <input
            type="text"
            name="email"
            value={user.uEmail || ""}
            disabled={true}
            className={styles.sign}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.subTitle}>First name</div>
          <input
            type="text"
            name="firstName"
            value={user.uFirstName || ""}
            onChange={onChangeFirstName}
            disabled={!isEdit}
            className={styles.sign}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.subTitle}>Last name</div>
          <input
            type="text"
            name="lastName"
            value={user.uLastName || ""}
            onChange={onChangeLastName}
            disabled={!isEdit}
            className={styles.sign}
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <div
          className={`${styles.editBtn} ${
            isEdit === true ? styles.saveBtn : styles.editBtn
          }`}
          onClick={edit}
        >
          {isEdit === true ? "Save" : "Edit"}
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
