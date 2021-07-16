import { createStore } from "redux";

//import { cleanThisUser } from "../utility";

import { ActionTypes, SET_QUIZ } from "./actions";
import { Quiz, Store } from "./types";

// Standard interface and functions

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

// store.subscribe(() => {
//   localStorage.setItem(localStorage_key, JSON.stringify(store.getState().user));
// });

export default createStore(appReducer);
