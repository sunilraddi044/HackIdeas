import { ADD_IDEAS, SET_USER } from "../actionTypes/ActionTypes";

const initialState = {
  ideas: [],
  user: "",
};

function addIdeaReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_IDEAS:
      return {
        ...state,
        ideas: action.data,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}

export default addIdeaReducer;
