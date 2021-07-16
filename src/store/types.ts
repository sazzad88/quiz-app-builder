export interface Quiz {
  id: string;
  title: string;
  layout: "single" | "multi";
  items: string[];
}

export interface Store {
  quizList: Quiz[];
}
