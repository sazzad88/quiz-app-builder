import { Store, Quiz } from "./types";
// import { store } from "./store";

export const SET_QUIZ = "SET_USER";

export type ActionTypes = { type: typeof SET_QUIZ; payload: Quiz };

export const setQuiz = (title: string, quizId: string): ActionTypes => {
  let quiz: Quiz = {
    id: quizId,
    title: title,
    layout: "single",
    items: [],
  };

  return {
    type: SET_QUIZ,
    payload: quiz,
  };
};
