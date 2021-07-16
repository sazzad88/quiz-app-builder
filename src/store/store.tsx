import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ActionTypes, SET_QUIZ } from "./actions";
import { Quiz, Store } from "./types";
import config from "../app_config.json";

let quizList: Quiz[] = [];

let baseStore: Store = {
  quizList: quizList,
};

try {
  if (localStorage.getItem(config.storage_key)) {
    baseStore = JSON.parse(localStorage.getItem(config.storage_key) as string);
  }
} catch (e) {}

// Redux implementation
function appReducer(state: Store = baseStore, action: ActionTypes) {
  switch (action.type) {
    case SET_QUIZ:
      return {
        ...state,
        quizList: action.payload,
      };

    default:
      return state;
  }
}

export default createStore(appReducer, applyMiddleware(thunk));
