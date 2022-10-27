import type { NextPage } from "next";
import Head from "next/head";

import Navigation from "../components/common/Navigation";
import EditCardList from "../components/home/EditCardList";
import Footer from "../components/common/Footer";
import styles from "../styles/Home.module.scss";

const Posts: NextPage = () => {
  return (
    <>
      <Head>
        <title>Editing WireFrame</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.homeContainer}>
        <EditCardList />
      </div>
      <Footer />
    </>
  );
};

export default Posts;
