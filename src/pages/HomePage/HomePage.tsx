import { Navbar } from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.scss";
import { Card } from "../../components/Card/Card";
import { Gradient } from "../../vendor/gradient";
import { useEffect } from "react";

const data = (
  <div className={styles.homepageText}>
    <h2>Czym jest dezinformacja?</h2>
    <br />
    <br />
    <p>
      Dezinformacja - świadome szerzenie zmanipulowanych informacji w celu
      osiągnięcia określonego efektu.
    </p>
    <br />
    <p>
      Jako odbiorcy karmieni jesteśmy masą “wiedzy” pozornej i w efekcie
      podejmujemy błędne decyzje, które są korzystne jedynie z punktu widzenia
      podmiotu dezinformującego.
    </p>
    <br />
    <p>
      Sprawdź swoje wyczucie i zagraj w nasz quiz - pozwoli Ci on dowiedzieć się
      w jakich kategoriach wiedzy jesteś podatny na manipulację.
    </p>
  </div>
);

export function HomePage() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  });

  return (
    <div className={styles.homePage}>
      <div className={styles.home__canvas}>
        <canvas
          id="gradient-canvas"
          className={styles.gradient_canvas}
          data-transition-in
        />
      </div>
      <Navbar />
      <div className={styles.fnnName}>
        <h1 className={styles.fnn}>FNN</h1>
        <p className={styles.fnnDesc}>Fake News Network</p>
      </div>

      <div className={styles.centerCard}>
        <div className={styles.missinf}>
          <Card data={data} className={styles.missinfPadding} />
        </div>
      </div>
    </div>
  );
}
