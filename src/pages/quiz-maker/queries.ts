import { instance } from "@/config/axios";
import { CategoryType, CategoryTypeResponse } from "@/type/quiz";
import { useQuery } from "@tanstack/react-query";

const API_KEY = {
  category: "api_category.php",
};

export const useGetCategory = () => {
  return useQuery<CategoryTypeResponse, Error, CategoryType[]>({
    queryKey: [API_KEY.category],
    queryFn: async () => {
      const response = await instance.get(API_KEY.category);
      return response.data as CategoryTypeResponse;
    },
    select: (data) => data.trivia_categories as CategoryType[],
  });
};
