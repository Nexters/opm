import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import styles from "../../styles/Navigation.module.scss";

interface NavigationProps {
  isTop?: boolean;
  isHome?: boolean;
}

const Navigation: NextPage<NavigationProps> = ({
  isTop = true,
  isHome = false,
}) => {
  const homeTrans = isHome && isTop;

  const user = window.localStorage.getItem('user');

  // TODO: 유효성 검증
  const checkUserValidation = (user: any) => {
    if (!user) {
      return false;
    }
    return true;
  }

  const handleProfile = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    const isValid = checkUserValidation(user);
    window.location.href = isValid ? '/profile' : '/login';
  }

  const handleRequest = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    const isValid = checkUserValidation(user);
    window.location.href = isValid ? '/contentRequest' : '/login';
  }

  return (
    <div className={styles.default}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <Image src="/svg/logo.png" alt="logo" width={56} height={56} />
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
              />
            ) : (
              <Image
                src="/svg/profile.svg"
                alt="profile"
                width={56}
                height={56}
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
            />
          ) : (
            <Image src="/svg/alarm.svg" alt="alert" width={56} height={56} />
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
  );
};

export default Navigation;
