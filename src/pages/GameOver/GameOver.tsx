import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { useApiSend } from "../../hooks/useApi";
import { SCORES_ENDPOINT } from "../../urls/api";
import styles from "./GameOver.module.scss";
import { SkillBar } from "../../components/SkillBar/SkillBar";
import { GameModeContext } from "../../App";
import { TOP_SCORES_PAGE } from "../../urls/frontend";

interface GameOverProps {
  score: number;
}

export function GameOver({ score }: GameOverProps) {
  const game = useContext(GameModeContext);
  const [name, setName] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  const navigate = useNavigate();

  const { mutate: apiSend, isSuccess } = useApiSend();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    setName("");

    const payload = {
      username: name,
      category: game.gameMode,
      score: score,
    };

    apiSend({ path: SCORES_ENDPOINT, data: payload });
  };

  useEffect(() => {
    isSuccess && navigate(TOP_SCORES_PAGE);
  }, [navigate, isSuccess]);

  return (
    <div className={styles.GameOver}>
      <Navbar />

      <div className={styles.squereScore}>
        <h3 className={styles.title}>Wynik {score}/10</h3>
        <p className={styles.link}>
          <a
            href="https://www.gov.pl/web/baza-wiedzy/rozpoznawanie-nieprawdziwych-informacji"
            target="_blank"
            rel="noreferrer"
          >
            Kliknij tutaj i naucz się rozpoznawać nieprawdziwe informacje
          </a>
        </p>

        <div>
          <SkillBar level={(score / 10) * 100} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="name">
            Podaj swoje imię:{" "}
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(event) => {
              setDisabled(false);
              setName(event.target.value);
            }}
          />
          <button
            disabled={disabled}
            type="submit"
            style={{ cursor: `${disabled ? "default" : "pointer"}` }}
            className={styles.button}
          >
            Zapisz swój wynik
          </button>
        </form>
      </div>
    </div>
  );
}
