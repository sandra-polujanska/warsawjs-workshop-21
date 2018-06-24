export const LOGIN_SUCCESS ="LOGIN_SUCCESS";
export const LOGIN_START = "LOGIN_START";

export const loginSuccess = (login) => ({type: LOGIN_SUCCESS, login});
export const loginStart = () => ({type: LOGIN_START});

export const login = (login, password) => async dispatch => {

  dispatch(loginStart());
  await new Promise(res => setTimeout(res, 5000));
  const response = await fetch("https://warsawjs-21-api.herokuapp.com/auth/", {
    method: "POST",
    body: JSON.stringify({
      password,
      username: login
    })
  });

  dispatch(loginSuccess(login));
};
