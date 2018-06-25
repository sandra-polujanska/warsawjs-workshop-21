import { LOGIN_START, LOGIN_SUCCESS } from "../../actions/user/index";

const defaultState = {
  // /*
  username: "",
  /*/
  username: "bibixx",
  //*/
  fetching: false,
};

const reducer = (state = defaultState, action) => {
  const newState = {...state};

  switch (action.type) {
    case LOGIN_START: {
      newState.fetching = true;

      break;
    }
    
    case LOGIN_SUCCESS: {
      newState.fetching = false;
      newState.username = action.payload;

      break;
    }

    // no default
  }

  return newState;
};

export default reducer;