import { API_URL } from "../../constants";

export const FETCH_START = "COMMENTS_FETCH_START";
export const FETCH_SUCCESS = "COMMENTS_FETCH_SUCCESS";
export const POST_SUCCESS = "COMMENTS_POST_SUCCESS";

export const fetchStart = () => ({ type: FETCH_START });
export const fetchSuccess = (comments) => ({ type: FETCH_SUCCESS, payload: comments });
export const postSuccessful = (postId, commentData) => ({ type: POST_SUCCESS, payload: {postId, commentData} });

export const fetchComments = (postId) => async dispatch => {
  dispatch(fetchStart());
  
  const { comments } = await fetch(`${API_URL}/posts/${postId}/comments`).then(res => res.json());
  
  dispatch(fetchSuccess({comments, postId}));
};

export const postComment = (postId, { body, position }) => async (dispatch, getState) => {
  const { username } = getState().user;

  const data = {
    username,
    body,
    position
  };

  const { ok, comment } = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res=>res.json());

  if (ok) {
    dispatch(postSuccessful(postId, comment));
  }
};