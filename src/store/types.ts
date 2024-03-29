export interface Option {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface ResultType {
  totalQuestion: number;
  correctAnswers: number;
  gainPoints: number;
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
  valid: boolean;
}

export interface Store {
  quizList: Quiz[];
}
