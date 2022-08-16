import { ParsedUrlQuery } from "querystring";

import type { NextPage } from "next";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "opm-models";

import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import MyRequestMenu from "../components/profile/MyRequestMenu";
import ProfileMenu from "../components/profile/ProfileMenu";
import WorksMenu from "../components/profile/WorksMenu";
import styles from "../styles/Profile.module.scss";
import { logout } from "../store/slice/user";
import { RootState } from "../store";
import {
  TAB_MAP,
  TAB_INDEX_MAP,
  TAB_KEY,
  TAB_INDEX_KEY,
} from "../helpers/profile";
import AdImage from "../components/common/AdImage";

const menuArr = [
  {
    title: "Profile",
    content: <ProfileMenu />,
  },
  {
    title: "My Request",
    content: <MyRequestMenu />,
  },
  {
    title: "Works",
    content: <WorksMenu />,
  },
];

const Profile: NextPage = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(
    TAB_MAP[router.query.tab as TAB_KEY] ?? 0,
  );
  const dispatch = useDispatch();
  const user = useSelector<RootState, UserInfo>((state) => state.user);

  if (!user.uId) {
    router.push("/login");
    return <div>Loading...</div>;
  }

  const handleLogoutClick = () => {
    dispatch(logout());
    router.push("/");
  };
  const handleTabClick = (index: number) => {
    const indexKey = `${index}` as TAB_INDEX_KEY;
    const query: ParsedUrlQuery = { tab: `${TAB_INDEX_MAP[indexKey]}` };
    setActiveIndex(index);
    router.push({ query });
  };

  return (
    <div>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.menuContainer}>
          <div className={styles.menu}>
            {menuArr.map((section, index) => (
              <div key={index}>
                <button
                  className={`${styles.button_deSelected} ${
                    activeIndex === index
                      ? styles.button_selected
                      : styles.button_deSelected
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  {section.title}
                </button>
              </div>
            ))}
          </div>
          <div className={styles.logoutBtn} onClick={handleLogoutClick}>
            Log out
          </div>
          <AdImage src="/ad/newjeans.jpeg" />
        </div>
        <div className={styles.content}>{menuArr[activeIndex].content}</div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
