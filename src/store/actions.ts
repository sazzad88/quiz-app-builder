import { Store, Quiz } from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { uuid } from "../utils";

export const SET_QUIZ = "SET_USER";

export type ActionTypes = { type: typeof SET_QUIZ; payload: Quiz[] };

export const addQuiz =
  (
    title: string,
    quizId: string
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    let quiz: Quiz = {
      id: quizId,
      title: title,
      layout: "single",
      items: [],
    };

    let quizList: Quiz[] = [...getState().quizList, quiz];

    dispatch(setQuiz(quizList));
  };

export const setQuiz = (quizList: Quiz[]): ActionTypes => {
  return {
    type: SET_QUIZ,
    payload: quizList,
  };
};
