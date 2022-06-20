import { useContext } from "react";
import styles from "./GameMode.module.scss";
import { Navbar } from "../../components/Navbar/Navbar";
import { Button, Container, Typography } from "@mui/material";
import { GameModeContext } from "../../App";
import { Link } from "react-router-dom";

export function GameMode() {
  const game = useContext(GameModeContext);
  const gameModes = [
    "Polityka",
    "Społeczeństwo",
    "Technologia",
    "Zdrowie",
    "CodersCamp",
    "Mix",
  ];

  const changeGameMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    game.setGameMode(e.currentTarget.innerText);
  };

  return (
    <div className={styles.GameView}>
      <Navbar />
      <Container className={styles.GameViewContainer}>
        <Typography className={styles.GameViewHeader} variant="h3">
          Wybierz kategorię:
        </Typography>
        {gameModes.map((gameMode, index) => (
          <Link key={index} className={styles.gameViewLink} to="/quiz">
            <Button
              key={index}
              className={styles.GameViewButton}
              onClick={changeGameMode}
            >
              {gameMode}
            </Button>
          </Link>
        ))}
      </Container>
    </div>
  );
}
