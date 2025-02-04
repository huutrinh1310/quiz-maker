import { Route, Routes } from "react-router";
import { RootLayout } from "@/layout/RootLayout";
import { QuizMaker } from "./pages/quiz-maker/QuizMaker";
import { QuizResult } from "./pages/quiz-result/QuizResult";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={<QuizMaker />}
        />
        <Route
          path={"result"}
          element={<QuizResult />}
        />
      </Route>
      <Route
        path={"*"}
        element={<div>Not found!</div>}
      />
    </Routes>
  );
}

export { App };
