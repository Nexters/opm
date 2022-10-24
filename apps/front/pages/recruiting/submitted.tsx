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
    `${user.uLastName} ${user.uFirstName}` || router.query.name;

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
            Thank you for applying!, <br /> {userFullName}!
          </div>
          <div className={styles.description}>
            I will send you an email after reviewing it as soon as possible.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Submitted;
