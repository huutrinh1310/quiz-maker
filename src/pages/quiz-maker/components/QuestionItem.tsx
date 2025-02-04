import { RadioGroup } from "@/components/ui/radio-group";
import { useQuestionAnswered } from "@/store/question";
import { QuizType } from "@/type/quiz";
import { useState } from "react";
import { AnswerButton } from "./AnswerButton";

export function QuestionItem({
  question,
  answers,
  isResult,
  correct_answer,
}: QuizType & {
  answers: string[];
  isResult?: boolean;
}) {
  const [answered, setAnswered] = useState<string | null>();
  const { answers: listAnswers, handleAnswer: handleAnswered } =
    useQuestionAnswered();

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswered(answer);
    handleAnswered(questionId, answer);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className="text-gray-800"
        dangerouslySetInnerHTML={{ __html: question as string }}
      />
      <RadioGroup
        className="flex gap-3"
        disabled={isResult}
      >
        {answers.map((answer, index) => {
          if (isResult) {
            return (
              <AnswerButton
                key={index}
                value={answer}
                disabled={isResult}
                isCorrect={correct_answer === answer}
                className={"w-fit !opacity-100"}
                isSelected={listAnswers[question as string] === answer}
              >
                {answer}
              </AnswerButton>
            );
          }
          return (
            <AnswerButton
              key={index}
              variant={answered === answer ? "default" : "outline"}
              value={answer}
              onClick={() => handleAnswer(question as string, answer)}
              disabled={isResult}
              className={"w-fit !opacity-100"}
            >
              {answer}
            </AnswerButton>
          );
        })}
      </RadioGroup>
    </div>
  );
}
