import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (<div className={styles.socialIconContainer}>
    <footer className={styles.Footer}>
      <p>&copy;  Oksana Feterovskaya {new Date().getFullYear()}</p>
      
        <a
          href="https://www.linkedin.com/in/oksana-feterovskaya-037587138/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className={styles.socialIcon} icon={faLinkedin} />
        </a>
        <a
          href="https://github.com/ofeterovskaya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon className={styles.socialIcon} icon={faGithub} />
        </a>
      
    </footer>
    </div>
  );
}
export default Footer;
