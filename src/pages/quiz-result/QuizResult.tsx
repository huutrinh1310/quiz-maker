import { useQuestionAnswered } from "@/store/question";
import QuestionList from "../quiz-maker/components/QuestionList";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Home, Plus } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function QuizResult() {
  const { answers, questions, resetAnswers } = useQuestionAnswered();
  const navigate = useNavigate();

  const markValue = useMemo(() => {
    return Object.keys(answers).filter(
      (key) =>
        answers[key] ===
        questions.find((question) => question.question === key)?.correct_answer
    ).length;
  }, []);

  const colorMark: Record<number, string> = {
    0: "bg-red-500",
    1: "bg-red-500",
    2: "bg-yellow-500",
    3: "bg-yellow-500",
    4: "bg-green-500",
    5: "bg-green-500",
  };

  return (
    <div className="flex flex-col">
      {Object.keys(answers).length > 0 ? (
        <>
          <QuestionList
            data={questions}
            isResult
          />
          <div
            className={cn(
              "mt-10 w-[20rem] mx-auto text-2xl font-semibold text-center text-white",
              colorMark[markValue]
            )}
          >
            {markValue} / {questions.length}
          </div>
          <Button
            variant={"secondary"}
            className={"hover:opacity-80 mt-9 text-xl h-auto mx-auto"}
            onClick={() => {
              resetAnswers();
              navigate("/")
            }}
          >
            <Plus size={30} />
            Create a new quiz
          </Button>
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div>Quiz not answered yet</div>
          <Link to={"/"}>
            <Button className={"hover:opacity-80"}>
              <Home size={15} />
              Back to quiz maker
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
