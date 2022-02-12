import { ADD_IDEAS, SET_USER } from "../actionTypes/ActionTypes";

export const addIdeas = (data) => {
  return { type: ADD_IDEAS, data };
};

export const setUser = (user) => {
  return { type: SET_USER, user };
};
