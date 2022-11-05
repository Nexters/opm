import { useState } from "react";
import Head from "next/head";
import { UserApiPath, UserInfo } from "opm-models";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navigation from "../../components/common/Navigation";
import Footer from "../../components/common/Footer";
import styles from "../../styles/Login.module.scss";
import { Api } from "../../helpers/api";
import { RootState } from "../../store";
import Loading from "../../components/common/Loading";

const Verification = () => {
  const router = useRouter();
  const [verifiedEmail, setVerifiedEmail] = useState<boolean>(true);
  const user = useSelector<RootState, UserInfo>((state) => state.user);

  if (!user.uId) {
    router.push("/login");
    return;
  }

  if (user.uEmailCheck) {
    router.push("/recruiting/setUpProfile");
    return <Loading />;
  }

  const userFullName =
    `${user.uFirstName} ${user.uLastName}` || router.query.name;

  const handleNextBtnClick = async () => {
    if (!verifiedEmail) {
      alert("Mail verification required");
      return;
    }

    // const body = {
    //   senderAddress: "official@atrans.world",
    //   senderName: "ATrans",
    //   title: "Verification Code",
    //   body: "12356",
    //   confirmAndSend: false,
    //   advertising: false,
    //   recipients: [user.uEmail],
    // };
    // const headers = {};
    // const mailRes = await Api.mailSend(body, headers);
    // if (mailRes.ok) {
    //   console.log(mailRes);
    // }

    const data = { uEmail: user.uEmail };
    const res = await Api.post(UserApiPath.checkedEmail, data);
    if (res.ok) {
      router.push("/recruiting/setUpProfile");
    }
  };

  return (
    <>
      <Head>
        <title>Email Verification</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.smallContainer}>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Welcome, {userFullName}!</div>
          <div className={styles.description}>
            Before you begin your quest to right the wrong writings <br />
            you must first verify your email.
          </div>
          <div className={styles.accountContainer}>
            <div className={styles.inputContainer}>
              <div style={{ display: "none" }}>
                <div className={styles.subtitleContainer}>
                  <div className={styles.subTitle}>
                    Verify your E-mail address
                  </div>
                  {verifiedEmail ? (
                    <div>이미지</div>
                  ) : (
                    <div className={styles.notVerifiedBtn}>
                      Not yet completed.
                    </div>
                  )}
                </div>
                <div className={styles.subTitleDescription}>
                  {!verifiedEmail && (
                    <div>
                      <div className={styles.errorText}>
                        Have you received the confirmation email yet?
                      </div>
                      <div className={styles.notVerifiedDescription}>
                        <div>- Please check your Spam e-mail folder.</div>
                        <div>
                          - Send a verification e-mail again.
                          <span className={styles.notVerifiedBtn}>Re-send</span>
                        </div>
                        <div>
                          - Try a different e-mail.
                          <span className={styles.notVerifiedBtn}>Try</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.editorSignUpBtnContainer}>
            <div
              className={
                verifiedEmail ? styles.loginBtn : styles.disableLoginBtn
              }
              onClick={handleNextBtnClick}
            >
              Skip for now
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Verification;
