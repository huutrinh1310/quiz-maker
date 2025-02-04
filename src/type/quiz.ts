import { z } from "zod";

export type CategoryType = {
  id: number;
  name: string;
};

export type CategoryTypeResponse = {
  trivia_categories: CategoryType[];
};

export type QuizMakerZodType = {
  categorySelect: z.ZodString;
  difficultySelect: z.ZodString;
};

export type QuizType = {
  category: string;
  type?: string;
  difficulty: string;
  question?: string;
  correct_answer?: string;
  incorrect_answers?: string[];
};

export type QuizTypeResponse = {
    response_code: number;
    results: QuizType[];
}