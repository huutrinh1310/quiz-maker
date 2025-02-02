export type CategoryType = {
    id: number;
    name: string;
}

export type CategoryTypeResponse = {
    trivia_categories: CategoryType[];
}