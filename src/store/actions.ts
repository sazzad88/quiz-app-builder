import { Store, Quiz } from "./types";

export const SET_QUIZ = "SET_USER";

export type ActionTypes = { type: typeof SET_QUIZ; payload: Quiz };

export const setUser = (quiz: Quiz): ActionTypes => ({
  type: SET_QUIZ,
  payload: quiz,
});
