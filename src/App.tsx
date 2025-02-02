import { Route, Routes } from "react-router";
import { RootLayout } from "@/layout/RootLayout";
import { QuizMaker } from "./pages/quiz-maker/QuizMaker";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<QuizMaker />} />
      </Route>
      <Route path={'*'} element={<div>Not found!</div>} />
    </Routes>
  );
}

export default App;
