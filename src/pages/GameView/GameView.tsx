import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./GameView.module.scss";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useApiGet } from "../../hooks/useApi";
import { Box, Modal, Typography, Link, CircularProgress } from "@mui/material";
import { GameModeContext, LoadingContext } from "../../App";
import { SCORE_PAGE } from "../../urls/frontend";

interface GameViewProps {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
}

type questionProps = {
  category: string;
  content: string;
  explanation: string;
  link: string;
  answers: {
    content: string;
    correct: boolean;
  }[];
  _id: number;
};

export function GameView({ score, setScore }: GameViewProps) {
  const [questions, setQuestions] = useState<questionProps[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { data, isFetched } = useApiGet({ path: `questions` });
  const [open, setOpen] = useState(false);
  const game = useContext(GameModeContext);
  const loadingState = useContext(LoadingContext);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    if (currentQuestion < 9) {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1);
    } else {
      navigate(SCORE_PAGE);
    }
  };

  const shuffle = (array: any[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    loadingState.setIsLoading(true);

    if (data) {
      const fetchedQuest = data.data;

      const filteredQuestByGameMode = fetchedQuest.filter(
        (quest: { category: string }) =>
          quest.category.toLowerCase() === game.gameMode.toLowerCase()
      );

      if (game.gameMode !== "MIX") {
        const sortedQuestions = shuffle(filteredQuestByGameMode);
        setQuestions(sortedQuestions);
        loadingState.setIsLoading(false);
      } else {
        const sortedQuestions = shuffle(fetchedQuest);
        setQuestions(sortedQuestions);
        loadingState.setIsLoading(false);
      }
    }
  }, [isFetched]);

  const handleAnswerOptionClick = (answer: boolean) => {
    if (questions[currentQuestion].answers[0].correct === answer) {
      setScore(score + 1);
    }
  };

  return (
    <div className={styles.GameView}>
      <Navbar />
      {loadingState.isLoading ? (
        <CircularProgress
          sx={{
            color: "white",
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "block",
          }}
        />
      ) : (
        <>
          <div className={styles.questionWrapper}>
            <h1 className={styles.title}>Pytanie {currentQuestion + 1}</h1>
            <p className={styles.information}>
              {questions[currentQuestion].content}
            </p>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute" as "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: 4,
                  }}
                  variant="h6"
                  component="h2"
                >
                  {questions[currentQuestion].explanation}
                </Typography>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    fontFamily: "Roboto",
                  }}
                  href={questions[currentQuestion].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Czytaj więcej
                </Link>
              </Box>
            </Modal>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.buttonTrue}
              onClick={() => {
                handleOpen();
                handleAnswerOptionClick(true);
              }}
            >
              Prawda
            </button>
            <button
              className={styles.buttonFalse}
              onClick={() => {
                handleOpen();
                handleAnswerOptionClick(false);
              }}
            >
              Fałsz
            </button>
          </div>
        </>
      )}
    </div>
  );
}
