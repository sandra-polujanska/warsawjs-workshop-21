import { API_URL } from "../../constants";

export const FETCH_START = "POSTS_FETCH_START";
export const FETCH_SUCCESS = "POSTS_FETCH_SUCCESS";
export const POST_SUCCESS = "POSTS_POST_SUCCESS";

export const fetchStart = () => ({ type: FETCH_START });
export const fetchSuccess = (posts) => ({ type: FETCH_SUCCESS, payload: posts });
export const postSuccess = (post) => ({ type: POST_SUCCESS, payload: post });

export const fetchPosts = () => async dispatch => {
  dispatch(fetchStart());
  
  const { posts } = await fetch(`${API_URL}/posts/`).then(res => res.json());

  const postsWithoutComments = posts.map(({ commentsCount, ...rest }) => ({...rest}));
  
  dispatch(fetchSuccess(postsWithoutComments));
};

export const postPost = (formData) => async (dispatch, getState) => {
  dispatch(fetchStart());

  const { username } = getState().user;
  formData.append("username", username);

  const { ok, post } = await fetch(`${API_URL}/posts/`, {
    method: "POST",
    body: formData,
  }).then(res => res.json());
  
  if (ok) {
    dispatch(postSuccess(post));
  }
};