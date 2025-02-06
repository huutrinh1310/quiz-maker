import { RootLayout } from "@/layout/RootLayout";
import { Home } from "lucide-react";
import { Link, Route, Routes } from "react-router";
import { Button } from "./components/ui/button";
import { QuizMaker } from "./pages/quiz-maker/QuizMaker";
import { QuizResult } from "./pages/quiz-result/QuizResult";

function App() {
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
        element={
          <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
            Not found!{" "}
            <Link to={"/"}>
              <Button className={"hover:opacity-80"}>
                <Home size={15} />
                Back to quiz maker
              </Button>
            </Link>
          </div>
        }
      />
    </Routes>
  );
}

export { App };
