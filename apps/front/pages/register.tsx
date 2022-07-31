import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Login.module.scss";

const Register: NextPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.currentTarget.value);
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.currentTarget.value);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);
  return (
    <>
      <Head>
        <title>Join the Community</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.container}>
        <div>
          <div className={styles.img2}></div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Join the Community.</div>
          <div className={styles.description}>
            Let&apos;s get you all set up so you can vertify your personal
            account.
          </div>
          <div className={styles.registerContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.subTitle}>First name</div>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={onChangeFirstName}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subTitle}>Last name</div>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={onChangeLastName}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>E-mail</div>
                <div className={styles.guideText}>
                  this address will be your ID
                </div>
              </div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={onChangeEmail}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>Password</div>
                <div className={styles.guideText}>
                  should be longer than 8 words
                </div>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                className={styles.sign}
              />
            </div>
          </div>
          <div className={styles.signupContainer}>
            <label className={styles.agree}>
              <input
                type="checkbox"
                name="agree"
                value="yes"
                className={styles.checkbox}
              />
              I agree to all the Term, Privacy Policy and Fees.
            </label>
            <div className={styles.loginBtn}>Sign Up</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
