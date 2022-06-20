import { useContext, useEffect, useRef } from "react";
import { GameModeContext } from "../../App";
import styles from "./SkillBar.module.scss";

export function SkillBar({ level }: { level: number }) {
  const skillBar = useRef<HTMLDivElement>(null);
  const game = useContext(GameModeContext);

  function changeSkillBarColor() {
    if (skillBar && skillBar.current) {
      if (level < 20) {
        skillBar.current.style.backgroundColor = "red";
      } else if (level >= 20 && level < 40) {
        skillBar.current.style.backgroundColor = "#ff6a00";
      } else if (level >= 40 && level < 60) {
        skillBar.current.style.backgroundColor = "yellow";
      } else if (level >= 60 && level < 80) {
        skillBar.current.style.backgroundColor = "#aaff00";
      } else skillBar.current.style.backgroundColor = "green";
    }
  }

  const showResult = () => {
    if (level < 50) {
      return "Musisz się jeszcze sporo nauczyć.";
    } else if (level < 80) {
      return "Jesteś dobry w rozpoznawaniu fake newsów!";
    } else return "Świetnie radzisz sobie z rozpoznawaniem fake newsów!";
  };

  useEffect(() => {
    changeSkillBarColor();
  });

  return (
    <div className={styles.skillBar}>
      <div className={styles.skillBarName}>{game.gameMode.toUpperCase()}</div>
      <div ref={skillBar} className={styles.skillBarLevel}>
        {level + "%"}
      </div>
      <h2 className={styles.resultDescription}>{showResult()}</h2>
    </div>
  );
}
