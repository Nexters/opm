import type { NextPage } from "next";
import { board } from "opm-dump";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { UserInfo } from "opm-models";
import { useState } from "react";

import styles from "../../styles/Navigation.module.scss";
import { RootState } from "../../store";

interface NavigationProps {
  isTop?: boolean;
  isHome?: boolean;
}

const Navigation: NextPage<NavigationProps> = ({
  isTop = true,
  isHome = false,
}) => {
  const homeTrans = isHome && isTop;
  const user = useSelector<RootState, UserInfo>((state) => state.user);
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleProfile = () => {
    if (!user.uId) {
      router.push("/logIn");
      return;
    }
    router.push("/profile");
  };

  const handleRequest = () => {
    if (!user.uId) {
      router.push("/logIn");
      return;
    }
    router.push("/contentRequest");
  };

  const handleDropdown = () => {
    if (!user.uId) {
      router.push("/logIn");
      return;
    }
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className={`${homeTrans ? styles.transparent : styles.default}`}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              {homeTrans ? (
                <Image
                  src="/svg/logo-secondary.svg"
                  alt="logo"
                  width="116px"
                  height="56px"
                />
              ) : (
                <Image
                  src="/svg/logo-primary.svg"
                  alt="logo"
                  width={116}
                  height={56}
                />
              )}
            </a>
          </Link>
        </div>
        <div className={styles.links}>
          <div onClick={handleProfile}>
            <a>
              {homeTrans ? (
                <Image
                  src="/svg/profileWhite.svg"
                  alt="profile"
                  width={56}
                  height={56}
                  className={styles.icon}
                />
              ) : (
                <Image
                  src="/svg/profile.svg"
                  alt="profile"
                  width={56}
                  height={56}
                  className={styles.icon}
                />
              )}
            </a>
          </div>
          <div>
            {homeTrans ? (
              <Image
                src="/svg/alarmWhite.svg"
                alt="alert"
                width={56}
                height={56}
                className={styles.icon}
                onClick={handleDropdown}
              />
            ) : (
              <Image
                src="/svg/alarm.svg"
                alt="alert"
                width={56}
                height={56}
                className={styles.icon}
                onClick={handleDropdown}
              />
            )}
          </div>
          <button
            className={homeTrans ? styles.buttonTransparent : styles.button}
            onClick={handleRequest}
          >
            Request
          </button>
        </div>
      </div>
      {dropdownVisible && (
        <div className={styles.dropdown}>
          {board.alarmList
            .slice(-5)
            .reverse()
            .map((alarm) => (
              <div key={alarm.key} className={styles.messageContainer}>
                <div className={styles.messageInfo}>New message on</div>
                <div className={styles.messageContent}>{alarm.content}</div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Navigation;
