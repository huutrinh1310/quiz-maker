import { QuizType } from "@/type/quiz";
import { create } from "zustand";

type QuizStoreState = {
  answers: Record<string, string>;
  questions: QuizType[];
} & Pick<QuizType, "question">;

type QuizStoreAction = {
  handleAnswer: (questionId: string, answer: string) => void;
  resetAnswers: () => void;
  setQuestions: (questions: QuizType[]) => void;
};

export const useQuestionAnswered = create<QuizStoreState & QuizStoreAction>(
  (set) => ({
    answers: {},
    handleAnswer: (questionId: string, answer: string) => {
      set((state) => ({
        answers: {
          ...state.answers,
          [questionId]: answer,
        },
      }));
    },
    resetAnswers: () => {
      set({ answers: {} });
    },
    questions: [],
    setQuestions: (questions) => {
      set({ questions });
    },
  })
);
