import { createStore } from "redux";

import { ActionTypes, SET_QUIZ } from "./actions";
import { Quiz, Store } from "./types";

let quizList: Quiz[] = [];

let baseStore: Store = {
  quizList: quizList,
};

// Redux implementation
function appReducer(state: Store = baseStore, action: ActionTypes) {
  switch (action.type) {
    case SET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };

    default:
      return state;
  }
}

export default createStore(appReducer);
