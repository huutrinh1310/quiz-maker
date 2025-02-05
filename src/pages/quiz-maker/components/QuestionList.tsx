import { QuizType } from "@/type/quiz";
import { memo } from "react";
import { QuestionItem } from "./QuestionItem";

export type QuestionListProps = {
  data: QuizType[];
  isResult?: boolean;
  listAnswers?: Record<string, string>;
};

function QuestionList({ data, isResult }: QuestionListProps) {
  return (
    <div className={"w-full flex flex-col gap-6 px-8"}>
      {data?.map((question, index) => (
        <QuestionItem
          key={index}
          answers={question.answers as string[]}
          isResult={isResult}
          {...question}
        />
      ))}
    </div>
  );
}

export default memo(QuestionList);
