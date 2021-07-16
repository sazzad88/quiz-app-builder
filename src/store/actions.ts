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

export const addQuestion =
  (
    quizId: string,
    text: string,
    imageUrl: string,
    points: number
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    const currentQuizList: Quiz[] = [...getState().quizList];
    let quizIndex: number = getState().quizList.findIndex(
      (item: Quiz) => item.id === quizId
    );

    if (quizIndex !== -1) {
      const quiz: Quiz = currentQuizList[quizIndex];

      quiz.items.push({
        id: uuid(),
        text,
        imageUrl,
        points,
        optionType: "single",
        correctAnswers: [],
        options: [],
      });

      currentQuizList[quizIndex] = quiz;

      dispatch(setQuiz(currentQuizList));
    }
  };

export const setQuiz = (quizList: Quiz[]): ActionTypes => {
  return {
    type: SET_QUIZ,
    payload: quizList,
  };
};
