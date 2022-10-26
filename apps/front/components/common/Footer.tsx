import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/Footer.module.scss";

const Footer: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.footer}>
      <div>© All rights reserved by ATrans | OPM</div>
      <div className={styles.footerMenu}>
        <div onClick={() => router.push("/recruiting")}>Join as Editor</div>
        <div className={styles.conditionsMenu}>
          <Link href="/terms">
            <div>Terms of Use</div>
          </Link>
          <Link href="/privacy">
            <div>Privacy Policy</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
