export interface Option {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  points: number;
  optionType: "single" | "multiple";
  correctAnswers: string[];
  options: Option[];
}

export interface Quiz {
  id: string;
  title: string;
  layout: "single" | "multi";
  items: Question[];
}

export interface Store {
  quizList: Quiz[];
}
