export interface Quiz {
  id: number;
  title: string;
  items: string[];
}

export interface Store {
  quizList: Quiz[];
}
