import { Link } from "react-router-dom";
import { NEW_QUESTION_PAGE } from "../../urls/frontend";
import styles from "./Navbar.module.scss";

export function Navbar() {
  return (
    <div className={styles.navbar}>
      {window.location.pathname !== "/" ? (
        <Link to="/">
          <div className={styles.navLogo}>
            <p className={styles.navFnn}>FNN</p>
            <p className={styles.navFnnDesc}>Fake News Network</p>
          </div>
        </Link>
      ) : null}
      <Link className={styles.navLinks} to="/quiz">
        Graj
      </Link>
      <Link className={styles.navLinks} to="">
        Zasady
      </Link>
      <Link className={styles.navLinks} to="/top_scores">
        Najlepsze wyniki
      </Link>
      <Link className={styles.navLinks} to={NEW_QUESTION_PAGE}>
        Dodaj pytanie
      </Link>
      <a
        className={styles.navLinks}
        href="https://www.tvp.info/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wyjdź
      </a>
    </div>
  );
}
