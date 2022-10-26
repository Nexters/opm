import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import {
  UserApiPath,
  UserInfo,
  UserSignUpData,
  UserLogInData,
} from "opm-models";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Navigation from "../../components/common/Navigation";
import Footer from "../../components/common/Footer";
import styles from "../../styles/Login.module.scss";
import { logIn, logout } from "../../store/slice/user";
import { Api } from "../../helpers/api";
import { RootState } from "../../store";
import Loading from "../../components/common/Loading";

const Recruiting: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreePP, setAgreePP] = useState<boolean>(false);

  const user = useSelector<RootState, UserInfo>((state) => state.user);

  if (user.uId && user.uEditorType === "CLIENT") {
    logout();
  } else if (user.uEditorType === "BEGINNER") {
    router.push("/recruiting/verification");
    return <Loading />;
  }

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

  const handleLogIn = async (data: UserLogInData) => {
    const res = await Api.post(UserApiPath.logIn, data);
    if (!res.ok) {
      alert("INVALID USER");
      return;
    }
    const jsonData = await res.json();
    dispatch(logIn(jsonData));
    router.push({
      pathname: "/recruiting/verification",
      query: { name: `${firstName} ${lastName}` },
    });
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
      uEditorType: "BEGINNER",
      uEmailCheck: false,
      uProfileInfo: undefined,
      uCertificate: undefined,
      uFiles: undefined,
    };

    const res = await Api.post(UserApiPath.signUpEditor, data);
    if (res.status == 409) {
      alert("Duplicate email error");
    }

    if (res.ok) {
      const data: UserLogInData = {
        uEmail: email,
        uPassword: password,
      };

      handleLogIn(data);
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Join as Editor</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.mainContainer}>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Join as Editor.</div>
          <div className={styles.description}>
            We are looking for native editors from various fields to join our
            services. You can work as much as you want – from anywhere around
            the globe.
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
            <div className={styles.logInBtn} onClick={handleSignUpClick}>
              Get started
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recruiting;
