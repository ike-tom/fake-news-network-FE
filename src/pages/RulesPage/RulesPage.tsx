import styles from "./RulesPage.module.scss";
import { Navbar } from "../../components/Navbar/Navbar";

export function RulesPage() {
  return (
    <div className={styles.rulesPage}>
      <Navbar />
      <div className={styles.rulesDescriptionContainer}>
        <p className={styles.rulesDescription}>
          Na początek wybierz kategorię z której chcesz się sprawdzić. Masz 10 pytań. Odpowiedz na jak najwięcej z nich i
          znajdź się wśród najlepszych. Dowiedz się na jaką kategorię fake newsów musisz zwrócić szczególną uwagę.
        </p>
      </div>
    </div>
  );
}
