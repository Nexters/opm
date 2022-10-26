import type { NextPage } from "next";
import { useState } from "react";
import { UserInfo } from "opm-models";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Profile.module.scss";
import { RootState } from "../store";

const Terms: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector<RootState, UserInfo>((state) => state.user);

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.menuContainer}>Terms of Use</div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
