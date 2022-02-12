import { ADD_IDEAS } from "../actionTypes/ActionTypes";

const initialState = {
  ideas: [],
};

function addIdeaReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_IDEAS:
      return {
        state,
        ideas: action.data,
      };

    default:
      return state;
  }
}

export default addIdeaReducer;
