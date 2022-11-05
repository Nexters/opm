import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { UserApiPath, UserSignUpData } from "opm-models";
import { useRouter } from "next/router";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Login.module.scss";
import { Api } from "../helpers/api";

const Register: NextPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreePP, setAgreePP] = useState<boolean>(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.currentTarget.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.currentTarget.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);
  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreePP(e.target.checked);
  };

  const handleSignUpClick = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill out everything.");
      return;
    }
    if (!agreePP) {
      alert("Please click the agreement.");
      return;
    }
    const matchedEmailRegExpList = email.match(/@/g);
    if (email.startsWith("@") || matchedEmailRegExpList?.length !== 1) {
      alert("Invalid email address");
      return;
    }

    const data: UserSignUpData = {
      uFirstName: firstName,
      uLastName: lastName,
      uEmail: email,
      uPassword: password,
      uEditorType: "CLIENT",
    };
    const res = await Api.post(UserApiPath.signUp, data);
    if (res.ok) {
      router.push("/login");
      return;
    }
    alert("Error!");
  };

  return (
    <>
      <Head>
        <title>Join the Community</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.mainContainer}>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Sign Up</div>
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
                onChange={handleFirstNameChange}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subTitle}>Last name</div>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>E-mail</div>
                <div className={styles.guideText}>
                  This address will be your ID.
                </div>
              </div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>Password</div>
                <div className={styles.guideText}>
                  It should be longer than 8 words.
                </div>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.sign}
              />
            </div>
          </div>
          <div className={styles.signUpContainer}>
            <label className={styles.agree}>
              <input
                type="checkbox"
                name="agree"
                className={styles.checkbox}
                onChange={handleAgreementChange}
              />
              I agree to all the terms and <br />
              conditions of ATrans privacy policy and pricing.
            </label>
            <div className={styles.loginBtn} onClick={handleSignUpClick}>
              Sign Up
            </div>
          </div>
          <Link href="/recruiting">
            <div className={styles.editorBtn}>Join as Editor ➜</div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
