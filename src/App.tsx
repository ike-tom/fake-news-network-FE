import { TopScores } from "./pages/TopScores/TopScores";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { GameView } from "./pages/GameView/GameView";
import { GameOver } from "./pages/GameOver/GameOver";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NewQuestionPage } from "./pages/NewQuestionPage/NewQuestionPage";
import { RulesPage } from "./pages/RulesPage/RulesPage";

import styles from "./App.module.scss";
import {
  GAME_MODE_PAGE,
  NEW_QUESTION_PAGE,
  QUIZ_PAGE,
  RULES_PAGE,
  SCORE_PAGE,
  TOP_SCORES_PAGE,
} from "./urls/frontend";
import { GameMode } from "./pages/GameMode/GameMode";

const queryClient = new QueryClient();
export type GameModeContextType = {
  gameMode: string;
  setGameMode: (gameMode: string) => void;
};
export type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
export const GameModeContext = createContext<GameModeContextType>({
  gameMode: "",
  setGameMode: () => {},
});
export const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
});

function App() {
  const [score, setScore] = useState<number>(0);
  const [gameMode, setGameMode] = useState<string>("POLITYKA");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.App}>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <GameModeContext.Provider value={{ gameMode, setGameMode }}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path={QUIZ_PAGE}
                  element={<GameView score={score} setScore={setScore} />}
                />
                <Route path={GAME_MODE_PAGE} element={<GameMode />} />
                <Route path={SCORE_PAGE} element={<GameOver score={score} />} />
                <Route path={TOP_SCORES_PAGE} element={<TopScores />} />
                <Route path={NEW_QUESTION_PAGE} element={<NewQuestionPage />} />
                <Route path={RULES_PAGE} element={<RulesPage />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </GameModeContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
