import type { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "../../styles/Footer.module.scss";

const Footer: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.footer}>
      <div>© All rights reserved by ATrans | OPM.</div>
      <div className={styles.footerMenu}>
        <div onClick={() => router.push("/recruiting")}>Join as Editor</div>
        <div className={styles.conditionsMenu}>
          <div>Terms of Use</div>
          <div>Privacy Policy</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
