import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { UserApiPath, UserInfo, EditorProfile } from "opm-models";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navigation from "../../components/common/Navigation";
import Footer from "../../components/common/Footer";
import styles from "../../styles/Login.module.scss";
import { Api } from "../../helpers/api";
import { RootState } from "../../store";
import Loading from "../../components/common/Loading";

const SetUpProfile = () => {
  const router = useRouter();

  const [language, setLanguage] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("(UTC-10:00) Hawaii");
  const [timezoneState, setTimezoneState] = useState<boolean>(false);
  const timezoneList = [
    "(UTC-10:00) Hawaii",
    "(UTC-08:00) Baja California",
    "(UTC-04:00) Santiago",
  ];

  const [educations, setEducations] = useState([]);
  const [education, setEducation] = useState({
    degree: "",
    nameOfSchool: "",
    major: "",
    attendedStartDate: "",
    attendedEndDate: "",
  });
  const [formData, setFormData] = useState(new FormData());

  const [careers, setCareers] = useState([]);
  const [career, setCareer] = useState({
    company: "",
    position: "",
    attendedStartDate: "",
    attendedEndDate: "",
  });
  const [activeBtn, setActiveBtn] = useState<Boolean>(false);

  const checkInputItems = () => {
    if (
      !language ||
      !timezone ||
      !education.degree ||
      !education.nameOfSchool ||
      !education.major ||
      !education.attendedStartDate ||
      !education.attendedEndDate
    ) {
      return false;
    }
    return true;
  };

  const getActiveState = useCallback(async () => {
    if (checkInputItems()) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, timezone, education]);
  useEffect(() => {
    getActiveState();
  }, [getActiveState]);

  const user = useSelector<RootState, UserInfo>((state) => state.user);

  if (!user.uId) {
    router.push("/logIn");
    return;
  }

  if (user.uProfileInfo) {
    router.push("/recruiting/certificate");
    return <Loading />;
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.currentTarget.value);
  };
  const handleTimezoneChange = (
    e: React.MouseEvent<HTMLDivElement>,
    i: string | null,
  ) => {
    setTimezoneState(!timezoneState);
    if (i) {
      setTimezone(i);
    }
  };

  const handleEducationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEducation({
      ...education,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    if (e.currentTarget.name === "file" && e.currentTarget.files) {
      formData.append("file", e.currentTarget.files[0]);
      setFormData(formData);
    }
  };

  const handleCareerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCareer({
      ...career,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleNextBtnClick = async () => {
    if (!checkInputItems()) {
      alert("Please fill out everything.");
      return;
    }

    // TODO: Required 시 검증 필요
    // if (
    //   !career.company ||
    //   !career.position ||
    //   !career.attendedStartDate ||
    //   !career.attendedEndDate
    // ) {
    //   alert("Please fill out career info.");
    //   return;
    // }

    const profile: EditorProfile = {
      language: language,
      timezone: timezone,
      educations: [education],
      careers: [career],
    };
    formData.append("profile", JSON.stringify(profile));
    formData.append("uEmail", JSON.stringify(user.uEmail));

    const res = await Api.filePost(UserApiPath.setUpEditorProfile, formData);
    if (res.ok) {
      router.push("/recruiting/certificate");
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Set up Profile</title>
        <meta name="description" content="OPM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={styles.mainContainer}>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Set up your Profile</div>
          <div className={styles.description}>
            Let us know your professional info. <br />
            This info will show on your profile card and profile page, <br /> so
            please enter details that will give your clients a sense of
            credibility.
          </div>
          <div className={styles.registerContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.subTitle}>Language</div>
              <input
                type="text"
                name="language"
                value={language}
                onChange={handleLanguageChange}
                className={styles.sign}
                placeholder="English, British or Both"
              />
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.subTitle}>Timezone</div>
              <div
                className={styles.timezoneBox}
                onClick={(e) => handleTimezoneChange(e, "")}
              >
                <div className={styles.timezoneText}>{timezone}</div>

                {timezoneState && (
                  <div className={styles.timezoneDropbox}>
                    {timezoneList.map((zone) => (
                      <div
                        key={zone}
                        onClick={(e) => handleTimezoneChange(e, zone)}
                      >
                        {zone}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.profileContainer}>
            <div>
              <div className={styles.inputContainer}>
                <div className={styles.subtitleContainer}>
                  <div className={styles.subTitle}>Educations</div>
                  <div className={styles.guideText}>
                    Required
                    {/* + Add more education history */}
                  </div>
                </div>
                <div>
                  <div className={styles.profileLine}>
                    <div className={styles.profileTitle}>Degree</div>
                    <input
                      type="text"
                      name="degree"
                      value={education.degree}
                      onChange={handleEducationChange}
                      className={styles.profileInput}
                    />
                  </div>
                  <div className={styles.profileLine}>
                    <div className={styles.profileTitle}>Name of School</div>
                    <input
                      type="text"
                      name="nameOfSchool"
                      value={education.nameOfSchool}
                      onChange={handleEducationChange}
                      className={styles.profileInput}
                    />
                  </div>
                  <div className={styles.profileLine}>
                    <div className={styles.profileTitle}>Major</div>
                    <input
                      type="text"
                      name="major"
                      value={education.major}
                      onChange={handleEducationChange}
                      className={styles.profileInput}
                    />
                  </div>
                  <div className={styles.profileLine}>
                    <div className={styles.profileTitle}>Attended Date</div>
                    <div className={styles.profileDateBox}>
                      <input
                        type="date"
                        name="attendedStartDate"
                        value={education.attendedStartDate}
                        onChange={handleEducationChange}
                        className={styles.profileDate}
                      />
                      <div>~</div>
                      <input
                        type="date"
                        name="attendedEndDate"
                        value={education.attendedEndDate}
                        onChange={handleEducationChange}
                        className={styles.profileDate}
                      />
                    </div>
                  </div>
                  <div className={styles.profileLine}>
                    <div className={styles.profileTitle}>
                      Certificate of enrollment/graduation
                    </div>
                    <input
                      type="file"
                      name="file"
                      onChange={handleEducationChange}
                      className={styles.fileInput}
                    />
                    <div style={{ width: "250px" }}>
                      Uploadable Files <br />
                      (.pdf, .doc, .docx, .png, .jpg)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <div className={styles.subtitleContainer}>
                  <div className={styles.subTitle}>Careers</div>
                  <div className={styles.guideText}>
                    Optional
                    {/* + Add more career history */}
                  </div>
                </div>
                <div>
                  <div className={styles.profileLine}>
                    <div className={styles.profileTitle}>Company</div>
                    <input
                      type="text"
                      name="company"
                      value={career.company}
                      onChange={handleCareerChange}
                      className={styles.profileInput}
                    />
                  </div>
                  <div className={styles.profileLine}>
                    <div className={styles.profileTitle}>Position</div>
                    <input
                      type="text"
                      name="position"
                      value={career.position}
                      onChange={handleCareerChange}
                      className={styles.profileInput}
                    />
                  </div>
                  <div className={styles.profileLine}>
                    <div className={styles.profileTitle}>Attended Date</div>
                    <div className={styles.profileDateBox}>
                      <input
                        type="date"
                        name="attendedStartDate"
                        value={career.attendedStartDate}
                        onChange={handleCareerChange}
                        className={styles.profileDate}
                      />
                      <div>~</div>
                      <input
                        type="date"
                        name="attendedEndDate"
                        value={career.attendedEndDate}
                        onChange={handleCareerChange}
                        className={styles.profileDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.editorSignUpBtnContainer}>
              <div
                className={activeBtn ? styles.logInBtn : styles.disableLoginBtn}
                onClick={handleNextBtnClick}
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SetUpProfile;
