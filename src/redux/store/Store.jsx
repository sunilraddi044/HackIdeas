import { createStore, combineReducers } from "redux";
import addIdeaReducer from "../reducer/Reducer";

const reducer = combineReducers({ addIdeas: addIdeaReducer });

const store = createStore(reducer);

export default store;
