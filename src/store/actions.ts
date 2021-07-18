import { Store, Quiz, Question, Option } from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { uuid } from "../utils";

export const SET_QUIZ = "SET_USER";

export type ActionTypes = { type: typeof SET_QUIZ; payload: Quiz[] };

const isValidQuiz = (quiz: Quiz) => {
  let valid = true;

  quiz.items.forEach((item: Question) => {
    if (item.correctAnswers.length === 0) {
      valid = false;
    }
  });

  quiz.items.forEach((question: Question) => {
    if (question.options.length < 2) valid = false;
  });

  return valid;
};

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
      valid: false,
    };

    let quizList: Quiz[] = [...getState().quizList, quiz];

    dispatch(setQuiz(quizList));
  };

export const updateQuiz =
  (
    quizId: string,
    title: string,
    layout: "single" | "multi"
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    let quizList: Quiz[] = [...getState().quizList];

    let quizIndex = quizList.findIndex((item: Quiz) => item.id === quizId);

    quizList[quizIndex].title = title;
    quizList[quizIndex].layout = layout;

    dispatch(setQuiz(quizList));
  };

export const sortQuizQuestions =
  (
    quizId: string,
    values: Question[]
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    const currentQuizList: Quiz[] = [...getState().quizList];
    let quizIndex: number = getState().quizList.findIndex(
      (item: Quiz) => item.id === quizId
    );

    if (quizIndex !== -1) {
      currentQuizList[quizIndex].items = values;

      dispatch(setQuiz(currentQuizList));
    }
  };

export const UpdateQuestion =
  (
    quizId: string,
    questionId: string,
    text: string,
    imageUrl: string,
    points: number,
    optionType: "single" | "multiple"
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    const currentQuizList: Quiz[] = [...getState().quizList];
    let quizIndex: number = getState().quizList.findIndex(
      (item: Quiz) => item.id === quizId
    );

    if (quizIndex !== -1) {
      const quiz: Quiz = currentQuizList[quizIndex];

      const QuestionIndex = quiz.items.findIndex(
        (item: Question) => item.id === questionId
      );

      if (QuestionIndex !== -1) {
        const question: Question = { ...quiz.items[QuestionIndex] };

        question.text = text;
        question.imageUrl = imageUrl;
        question.points = points;
        question.optionType = optionType;

        if (optionType === "single" && question.correctAnswers.length > 1) {
          question.correctAnswers = [
            question.correctAnswers[question.correctAnswers.length - 1],
          ];
        }

        currentQuizList[quizIndex].items[QuestionIndex] = question;

        currentQuizList[quizIndex].valid = isValidQuiz(
          currentQuizList[quizIndex]
        );

        dispatch(setQuiz(currentQuizList));
      }
    }
  };

export const DeleteQuestion =
  (
    quizId: string,
    questionId: string
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    const currentQuizList: Quiz[] = [...getState().quizList];
    let quizIndex: number = getState().quizList.findIndex(
      (item: Quiz) => item.id === quizId
    );

    if (quizIndex !== -1) {
      currentQuizList[quizIndex].items = currentQuizList[
        quizIndex
      ].items.filter((item: Question) => item.id !== questionId);

      currentQuizList[quizIndex].valid = isValidQuiz(
        currentQuizList[quizIndex]
      );

      dispatch(setQuiz(currentQuizList));
    }
  };

export const AddOption =
  (
    quizId: string,
    questionId: string,
    text: string,
    imageUrl: string
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    const currentQuizList: Quiz[] = [...getState().quizList];
    let quizIndex: number = getState().quizList.findIndex(
      (item: Quiz) => item.id === quizId
    );

    if (quizIndex !== -1) {
      const quiz: Quiz = currentQuizList[quizIndex];

      const QuestionIndex = quiz.items.findIndex(
        (item: Question) => item.id === questionId
      );

      if (QuestionIndex !== -1) {
        const question: Question = { ...quiz.items[QuestionIndex] };

        const options = question.options;
        options.push({
          id: uuid(),
          text: text,
          imageUrl: imageUrl,
        });

        question.options = options;

        currentQuizList[quizIndex].items[QuestionIndex] = question;

        currentQuizList[quizIndex].valid = isValidQuiz(
          currentQuizList[quizIndex]
        );

        dispatch(setQuiz(currentQuizList));
      }
    }
  };

export const DeleteOption =
  (
    questionId: string,
    quizId: string,
    optionId: string
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    const currentQuizList: Quiz[] = [...getState().quizList];
    let quizIndex: number = getState().quizList.findIndex(
      (item: Quiz) => item.id === quizId
    );

    if (quizIndex !== -1) {
      const quiz: Quiz = currentQuizList[quizIndex];

      const QuestionIndex = quiz.items.findIndex(
        (item: Question) => item.id === questionId
      );

      if (QuestionIndex !== -1) {
        const question: Question = { ...quiz.items[QuestionIndex] };

        question.options = question.options.filter(
          (item: Option) => item.id !== optionId
        );

        question.correctAnswers = question.correctAnswers.filter(
          (item) => item !== optionId
        );

        currentQuizList[quizIndex].items[QuestionIndex] = question;

        currentQuizList[quizIndex].valid = isValidQuiz(
          currentQuizList[quizIndex]
        );

        dispatch(setQuiz(currentQuizList));
      }
    }
  };

export const UpdateOption =
  (
    optionId: string,
    quizId: string,
    questionId: string,
    text: string,
    imageUrl: string,
    answer: string
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  (dispatch, getState) => {
    const currentQuizList: Quiz[] = [...getState().quizList];
    let quizIndex: number = getState().quizList.findIndex(
      (item: Quiz) => item.id === quizId
    );

    if (quizIndex !== -1) {
      const quiz: Quiz = currentQuizList[quizIndex];

      const QuestionIndex = quiz.items.findIndex(
        (item: Question) => item.id === questionId
      );

      if (QuestionIndex !== -1) {
        const question: Question = { ...quiz.items[QuestionIndex] };

        if (answer !== "") {
          if (question.optionType === "multiple")
            question.correctAnswers = Array.from(
              new Set([...question.correctAnswers, answer])
            );
          else question.correctAnswers = [answer];
        } else {
          question.correctAnswers = question.correctAnswers.filter(
            (item) => item !== optionId
          );
        }

        const optionIndex = question.options.findIndex(
          (item: Option) => item.id === optionId
        );

        question.options[optionIndex].text = text;
        question.options[optionIndex].imageUrl = imageUrl;

        currentQuizList[quizIndex].items[QuestionIndex] = question;

        currentQuizList[quizIndex].valid = isValidQuiz(
          currentQuizList[quizIndex]
        );

        dispatch(setQuiz(currentQuizList));
      }
    }
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

      currentQuizList[quizIndex].valid = false;

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
