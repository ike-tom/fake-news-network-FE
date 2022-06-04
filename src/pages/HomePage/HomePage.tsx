import { Navbar } from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <Navbar />
    </div>
  );
}
