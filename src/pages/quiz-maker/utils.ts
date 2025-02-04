import { z } from "zod";
import { QuizMakerZodType } from "@/type/quiz";

const quizMakerSchema = z.object<QuizMakerZodType>({
  categorySelect: z.string().nonempty(),
  difficultySelect: z.string().nonempty(),
});

export { quizMakerSchema };
