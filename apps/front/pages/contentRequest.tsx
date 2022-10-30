import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BoardApiPath, UserInfo } from "opm-models";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import styles from "../styles/Board.module.scss";
import { RootState } from "../store";
import BackButton from "../components/common/BackButton";
import InfoHeader from "../components/contentRequest/titlePhase/InfoHeader";
import Button from "../components/contentRequest/Button";
import { Api } from "../helpers/api";
import Loading from "../components/common/Loading";
import DisableButton from "../components/contentRequest/DisableButton";
import BoardOrderDetail from "../components/board/BoardOrderDetail";

enum PagePhase {
  title = "title",
  content = "content",
}

const ContentRequest: NextPage = () => {
  const router = useRouter();
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const [title, setTitle] = useState<string>("");
  const categoryList: string[] = [
    "Story Writing",
    "Summary Writing",
    "Essays",
    "Admissions/Applications",
    "Business",
    "Academic Writing",
    "Assignments",
    "Other Writings",
  ];
  const [category, setCategory] = useState<number>(0);
  const [categoryDrop, setCategoryDrop] = useState<Boolean>(false);
  const handleCategory = (i: number) => {
    setCategoryDrop(!categoryDrop);
    if (i !== -1) {
      setCategory(i);
    }
  };

  const [description, setDescription] = useState<string>("");
  const [pagePhase, setPagePhase] = useState(PagePhase.title);
  const [content, setContent] = useState<string>("");

  if (!user.uId) {
    router.push("/logIn");
    return <Loading />;
  }

  const backPhase = () => {
    setPagePhase(PagePhase.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleNextClick = () => setPagePhase(PagePhase.content);
  const handleSubmitClick = async () => {
    if (content.trim().length === 0) {
      alert("Please fill out content.");
      return;
    }
    const data = {
      uId: user.uId,
      aTitle: title,
      aDescription: description,
      aContent: content,
      aCategory: "",
      aCreateDate: new Date().toISOString(),
    };
    const res = await Api.post(BoardApiPath.write, data);
    if (!res.ok) {
      const json = await res.json();
      console.error(json);
      return;
    }
    router.push("/profile?tab=myRequest");
  };

  return (
    <>
      <Navigation />
      <main className={styles.boardContainer}>
        <BackButton onClick={backPhase} />

        {pagePhase === PagePhase.title ? (
          <div className={styles.requestContainer}>
            <InfoHeader />
            <div>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>Category of request</div>
              </div>
              <div
                className={styles.categoryDropBox}
                onClick={() => handleCategory(-1)}
              >
                {categoryList[category]}
                {categoryDrop && (
                  <div className={styles.categoryDropdown}>
                    {categoryList.map((category, i) => (
                      <div key={i} onClick={() => handleCategory(i)}>
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className={styles.subtitleContainer}>
                <div className={styles.subTitle}>
                  Additional Request (Optional)
                </div>
                <div className={styles.guideText}>{description.length}/300</div>
              </div>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className={styles.inputDescription}
                maxLength={300}
                placeholder="Formal / Informal?  Purpose / Audience?"
              />
            </div>
            <div />
            {categoryList[category] ? (
              <Button label={"Next"} onClick={handleNextClick} />
            ) : (
              <DisableButton
                label={"Next"}
                onClick={() => alert("Please enter title")}
              ></DisableButton>
            )}
          </div>
        ) : (
          <>
            <div className={styles.textContainer}>
              <div className={styles.inputContainer}>
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  className={styles.inputPost}
                  maxLength={12000}
                  placeholder="Please fill out the contents to be corrected."
                />
              </div>
              <Button label={"Post"} onClick={handleSubmitClick} />
            </div>
            <div className={styles.chatContainer}>
              <BoardOrderDetail content={content} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ContentRequest;
