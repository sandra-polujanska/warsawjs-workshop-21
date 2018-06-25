import { API_URL } from "../../constants";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const loginStart = () => ({ type: LOGIN_START });
export const loginSuccess = (username) => ({ type: LOGIN_SUCCESS, payload: username });

export const login = ({username, password}) => async dispatch => {
  dispatch(loginStart());
  await new Promise(resolve => setTimeout(resolve, 1000));

  await fetch(`${API_URL}/auth/`, {
    method: "POST",
    body: {
      username,
      password
    }
  }).then(res => res.json());

  dispatch(loginSuccess(username));
};