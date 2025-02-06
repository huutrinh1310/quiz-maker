import { Route, Routes, useLocation } from "react-router";
import { RootLayout } from "@/layout/RootLayout";
import { QuizMaker } from "./pages/quiz-maker/QuizMaker";
import { QuizResult } from "./pages/quiz-result/QuizResult";

function App() {
  const location = useLocation();
  alert(location.pathname);
  return (
    <Routes>
      <Route
        path="/"
        element={<RootLayout />}
      >
        <Route
          path="/"
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
