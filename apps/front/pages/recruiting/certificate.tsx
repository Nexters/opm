import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import {
  CorrectAssignments,
  ParaphraseAssignments,
  UserInfo,
  UserApiPath,
  Assignments,
} from "opm-models";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navigation from "../../components/common/Navigation";
import Footer from "../../components/common/Footer";
import styles from "../../styles/Login.module.scss";
import { Api } from "../../helpers/api";
import { RootState } from "../../store";
import Loading from "../../components/common/Loading";
import {
  pickAssignment,
  updateAssignmentNumber,
} from "../../helpers/recruiting/randomQuestion";

const Certificate = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);

  const [biography, setBiography] = useState<string>("");
  const [formData, setFormData] = useState(new FormData());

  const [correctAssignments, setCorrectAssignments] = useState<Assignments[]>(
    user.uCertificate?.correctAssignments || null,
  );

  const [paraphraseAssignments, setParaphraseAssignments] = useState<
    Assignments[]
  >(user.uCertificate?.paraphraseAssignments || null);

  const makeFirstAssignments = async () => {
    const correctPickList = pickAssignment(CorrectAssignments);
    const paraphrasePickList = pickAssignment(ParaphraseAssignments);
    const correctData = updateAssignmentNumber(
      correctPickList,
      CorrectAssignments,
    );
    const paraphraseData = updateAssignmentNumber(
      paraphrasePickList,
      ParaphraseAssignments,
    );
    const res = await Api.post(UserApiPath.setUpAssignments, {
      uEmail: user.uEmail,
      correctData,
      paraphraseData,
    });
    if (res.ok) {
      setCorrectAssignments(correctData);
      setParaphraseAssignments(paraphraseData);
    }
  };

  const makeAssignments = async () => {
    const correctData: Assignments[] = [];
    user.uCertificate.correctAssignments.forEach((el) => {
      correctData.push({
        number: el.number,
        question: el.question,
        answer: "",
      });
    });
    setCorrectAssignments(correctData);

    const paraphraseData: Assignments[] = [];
    user.uCertificate.paraphraseAssignments.forEach((el) => {
      paraphraseData.push({
        number: el.number,
        question: el.question,
        answer: "",
      });
    });
    setParaphraseAssignments(paraphraseData);
  };

  useEffect(() => {
    if (!user.uCertificate) {
      makeFirstAssignments();
    } else {
      makeAssignments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user.uId) {
    router.push("/logIn");
    return;
  }
  if (user.uCertificate?.resume) {
    router.push("/recruiting/submitted");
    return <Loading />;
  }

  const handleBiographyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBiography(e.currentTarget.value);
    if (biography.length >= 600) {
      alert("Exceeding the number of characters");
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    formData.append("file", e.currentTarget.files[0]);
    setFormData(formData);
  };

  const handleCorrectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    number: number,
  ) => {
    const copiedList = [...correctAssignments];
    copiedList.forEach((el) => {
      if (el.number === number) {
        el.answer = e.currentTarget.value;
      }
    });
    setCorrectAssignments(copiedList);
  };

  const handleParaphraseChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    number: number,
  ) => {
    const copiedList = [...paraphraseAssignments];
    copiedList.forEach((el) => {
      if (el.number === number) {
        el.answer = e.currentTarget.value;
      }
    });
    setParaphraseAssignments(copiedList);
  };

  const handleSubmitBtnClick = async () => {
    if (!formData.get("file")) {
      alert("Upload resume required");
      return;
    }
    formData.append("biography", biography);
    formData.append("correct", JSON.stringify(correctAssignments));
    formData.append("paraphrase", JSON.stringify(paraphraseAssignments));
    formData.append("uEmail", JSON.stringify(user.uEmail));

    const res = await Api.filePost(UserApiPath.setUpCertificates, formData);
    if (res.ok) {
      router.push("/recruiting/submitted");
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Applying for Editor</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.mainContainer}>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Applying for Editor ...</div>

          <div className={styles.registerContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.subTitle}>Biography</div>
              <textarea
                className={styles.biographyInput}
                value={
                  biography || "Briefly introduce yourself as potential editor."
                }
                maxLength={600}
                onChange={handleBiographyChange}
              ></textarea>
              <div className={styles.biographyLength}>
                {biography.length} / 600
              </div>
              <div className={styles.inputContainer}>
                <div>
                  <div className={styles.subTitle}>Upload Resume</div>
                  <div className={styles.certificateGuideTitle}>
                    Can Uploadable Files (.pdf, .doc, .docx, .png, .jpg)
                  </div>
                </div>
                <input
                  type="file"
                  onChange={handleResumeChange}
                  className={styles.resumeFileInput}
                />
              </div>
              <div className={styles.certificateSubTitle}>
                <div className={styles.subTitle}>Assignments #1-3</div>
                <div className={styles.certificateGuideTitle}>
                  Please correct the sentences below.
                </div>
              </div>
              {correctAssignments &&
                correctAssignments.map((assignments, i) => (
                  <div key={i}>
                    <div>{assignments.question}</div>
                    <input
                      type="text"
                      name="correctAssignment"
                      value={correctAssignments[i].answer}
                      onChange={(e) =>
                        handleCorrectChange(e, correctAssignments[i].number)
                      }
                      className={styles.certificateInput}
                    />
                  </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.certificateSubTitle}>
                <div className={styles.subTitle}>Assignments #4-6</div>
                <div className={styles.certificateGuideTitle}>
                  Please paraphrase the sentences below.
                </div>
              </div>
              {paraphraseAssignments &&
                paraphraseAssignments.map((assignments, i) => (
                  <div key={i}>
                    <div>{assignments.question}</div>
                    <input
                      type="text"
                      name="paraphraseAssignment"
                      value={paraphraseAssignments[i].answer}
                      onChange={(e) =>
                        handleParaphraseChange(
                          e,
                          paraphraseAssignments[i].number,
                        )
                      }
                      className={styles.certificateInput}
                    />
                  </div>
                ))}
            </div>
            <div className={styles.editorSignUpBtnContainer}>
              <div className={styles.logInBtn} onClick={handleSubmitBtnClick}>
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Certificate;
