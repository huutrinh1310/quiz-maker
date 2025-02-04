import { instance } from "@/config/axios";
import {
    CategoryType,
    CategoryTypeResponse,
    QuizType,
    QuizTypeResponse,
} from "@/type/quiz";
import {
    useMutation,
    useQuery,
    UseQueryOptions
} from "@tanstack/react-query";

const API_KEY = {
  category: "api_category.php",
  quiz: "api.php",
};

export const useGetCategory = (
  options?: Partial<
    UseQueryOptions<CategoryTypeResponse, Error, CategoryType[]>
  >
) => {
  return useQuery<CategoryTypeResponse, Error, CategoryType[]>({
    queryKey: [API_KEY.category],
    queryFn: async () => {
      const response = await instance.get(API_KEY.category);
      return response.data as CategoryTypeResponse;
    },
    select: (data) => data.trivia_categories as CategoryType[],
    ...options,
  });
};

export const useMutationCreateQuiz = () => {
  return useMutation<QuizTypeResponse, Error, QuizType>({
    mutationKey: [API_KEY.quiz],
    mutationFn: async (formData: QuizType) => {
      const url = `${API_KEY.quiz}?amount=5&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`;
      const response = await instance.get(url);
      return response.data as QuizTypeResponse;
    },
  });
};
