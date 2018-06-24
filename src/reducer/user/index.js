import { LOGIN_START } from "../../action/user/index";
import { LOGIN_SUCCESS } from "../../action/user/index";
const initialState = {
  username: "",
  fetching: ""
}

const userReducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case LOGIN_SUCCESS: {
      newState.username = action.login;
      newState.fetching = false;
      return newState;
    }
    case LOGIN_START: {
      newState.username = action.login;
      newState.fetching = true;
      return newState;
    }
    default:
    return state;
  }
};

export default userReducer;
