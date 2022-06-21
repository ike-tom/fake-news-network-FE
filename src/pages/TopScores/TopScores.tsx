import { Button, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GameModeContext, LoadingContext } from "../../App";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { TopScoresTable } from "../../components/TopScoresTable/TopScoresTable";
import { useApiGet } from "../../hooks/useApi";
import { SCORES_ENDPOINT } from "../../urls/api";

import styles from "./TopScores.module.scss";

const gameModes = [
  "Polityka",
  "Społeczeństwo",
  "Technologia",
  "Zdrowie",
  "CodersCamp",
  "Mix",
];

export interface Highscore {
  username: string;
  category: string;
  score: number;
}

export function TopScores() {
  const game = useContext(GameModeContext);
  const loadingState = useContext(LoadingContext);
  const [highscores, setHighscores] = useState<Highscore[]>([]);

  const changeGameMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    game.setGameMode(e.currentTarget.innerText);
  };

  const { data: payload } = useApiGet({ path: SCORES_ENDPOINT });

  useEffect(() => {
    loadingState.setIsLoading(true);

    if (payload) {
      const filteredPayload = payload.data.filter(
        (score: Highscore) => score.category === game.gameMode
      );
      const sortedPayload = filteredPayload.sort(
        (a: Highscore, b: Highscore) => {
          return b.score - a.score;
        }
      );
      setHighscores(sortedPayload);
      loadingState.setIsLoading(false);
    }
  }, [payload, game.gameMode]);

  const data = (
    <div className={styles.glassPadding}>
      <h3 className={styles.hofTitle}>Hall of Fame</h3>
      <div className={styles.gameModeContainer}>
        {gameModes.map((gameMode, index) => (
          <Button
            key={index}
            className={styles.gameModeButton}
            onClick={changeGameMode}
          >
            {gameMode}
          </Button>
        ))}
      </div>
      {loadingState.isLoading ? (
        <CircularProgress className={styles.progressCircle} />
      ) : (
        <div className={styles.scoresTable}>
          <TopScoresTable highscores={highscores} />
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <Card data={data} />
      </div>
    </div>
  );
}
