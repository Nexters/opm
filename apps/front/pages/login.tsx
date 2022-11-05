import { createCipheriv } from "crypto";

import type { NextPage } from "next";
import { KeyboardEventHandler, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { UserApiPath, UserLogInData } from "opm-models";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Login.module.scss";
import { login } from "../store/slice/user";
import { Api } from "../helpers/api";

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidEmail(true);
    setEmail(e.currentTarget.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidPassword(true);
    setPassword(e.currentTarget.value);
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { key } = event;
    if (key !== "Enter") {
      return;
    }
    if (!email) {
      setValidEmail(false);
      return;
    }
    if (!password) {
      setValidPassword(false);
      return;
    }
    handleLogInClick();
  };

  const handleLogInClick = async () => {
    if (!email) {
      setValidEmail(false);
      return;
    }
    if (!password) {
      setValidPassword(false);
      return;
    }

    const algorithm = "aes-256-cbc";
    const key = Buffer.from(process.env.NEXT_PUBLIC_CIPHER_KEY!);
    const iv = Buffer.from(process.env.NEXT_PUBLIC_CIPHER_IV!);
    const cipher = createCipheriv(algorithm, key, iv);
    let hashPassword = cipher.update(password, "utf8", "base64");
    hashPassword += cipher.final("base64");

    const data: UserLogInData = {
      uEmail: email,
      uPassword: hashPassword,
    };
    const res = await Api.post(UserApiPath.login, data);
    if (!res.ok) {
      setValidEmail(false);
      setValidPassword(false);
      alert("INVALID USER");
      return;
    }
    const jsonData = await res.json();
    dispatch(login(jsonData));
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.mainContainer}>
        <div>
          <div className={styles.title}>Log In.</div>
          <div className={styles.accountContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>E-mail</div>
                {!validEmail && (
                  <div className={styles.errorText}>
                    please check your address
                  </div>
                )}
              </div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={handleInputKeyDown}
                className={styles.sign}
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>Password</div>
                {!validPassword && (
                  <div className={styles.errorText}>
                    please check your password
                  </div>
                )}
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleInputKeyDown}
                className={styles.sign}
              />
            </div>
          </div>
          <div className={styles.loginButtonContainer}>
            <div className={styles.loginBtn} onClick={handleLogInClick}>
              Log In
            </div>
            <Link href="/register">
              <div className={styles.signUpBtn}>Join our Community</div>
            </Link>
            <div className={styles.logoutBtn}>Forgot your password?</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
