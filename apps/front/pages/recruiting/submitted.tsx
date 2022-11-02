import type { NextPage } from "next";
import Head from "next/head";
import { UserInfo } from "opm-models";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navigation from "../../components/common/Navigation";
import Footer from "../../components/common/Footer";
import styles from "../../styles/Login.module.scss";
import { RootState } from "../../store";

const Submitted: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);

  const userFullName =
    `${user.uFirstName} ${user.uLastName}` || router.query.name;

  return (
    <>
      <Head>
        <title>Submitted</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.smallContainer}>
        <div className={styles.rightContainer}>
          <div className={styles.title}>
            Thank you for applying, <br /> {userFullName}!
          </div>
          <div className={styles.description}>
            We will send you an email after reviewing your application as soon
            as possible.
          </div>
          <div className={styles.nameCardTitle}>Your temporary name card</div>
          <div className={styles.nameCardContainer}>
            <div className={styles.nameCardInName}>{userFullName}</div>
            <div>rate ...</div>
            <div>School : University </div>
            <div>Degree : {user.uProfileInfo?.educations[0].degree} </div>
            <div>Major : {user.uProfileInfo?.educations[0].major}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Submitted;
