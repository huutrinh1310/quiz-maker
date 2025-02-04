import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuestionAnswered } from "@/store/question";
import { QuizType } from "@/type/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import QuestionList from "./components/QuestionList";
import { useGetCategory, useMutationCreateQuiz } from "./queries";
import { quizMakerSchema } from "./utils";
import { LoadingSpin } from "@/components/shared/LoadingSpin";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";

export function QuizMaker() {
  const { data, isLoading } = useGetCategory();
  const { mutate, data: dataCreateQuiz, isPending } = useMutationCreateQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof quizMakerSchema>>({
    resolver: zodResolver(quizMakerSchema),
  });

  const { answers, resetAnswers, setQuestions } = useQuestionAnswered();
  const onSubmit = form.handleSubmit((data) => {
    mutate(
      {
        category: data.categorySelect,
        difficulty: data.difficultySelect,
      },
      {
        onSuccess: (data) => {
          resetAnswers();
          setQuestions(data.results);
        },
        onError: (err: Error | AxiosError) => {
          resetAnswers();
          const error = err as AxiosError;
          if (
            error?.response?.data &&
            error?.response?.data &&
            typeof error.response.data === "object" &&
            "response_code" in error.response.data
          ) {
            const responseCode = error.response.data.response_code;
            if (responseCode === 5) {
              toast({
                title: "Warning",
                description: "Too many create quiz requested at the same time",
              });
            }
          }
        },
      }
    );
  });

  const QuestionListCallback = useCallback(() => {
    return <QuestionList data={dataCreateQuiz?.results as QuizType[]} />;
  }, [dataCreateQuiz]);

  useEffect(() => {
    resetAnswers();
  }, []);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="flex w-full gap-2"
        >
          {isLoading ? (
            <LoadingSpin />
          ) : (
            <FormField
              name="categorySelect"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  >
                    <SelectTrigger
                      className="flex-1"
                      id="categorySelect"
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                            id="categorySelect"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}
          <FormField
            name="difficultySelect"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  name={field.name}
                >
                  <SelectTrigger
                    className="flex-1"
                    id="difficultySelect"
                  >
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            variant={isPending ? "secondary" : "default"}
            type={"submit"}
            disabled={isPending}
          >
            Create
          </Button>
        </form>
      </Form>
      <QuestionListCallback />

      {Object.keys(answers).length === 5 && (
        <Button
          variant={"default"}
          onClick={() => {
            navigate("/result");
          }}
          className="w-[20rem] mx-auto"
        >
          Submit
        </Button>
      )}
    </>
  );
}
