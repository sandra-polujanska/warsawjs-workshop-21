export const POSTS_FETCHING_START = "POSTS_FETCHING_START";
export const POSTS_FETCHING_SUCCESS = "POSTS_FETCHING_SUCCESS";

export const postsStart = () => ({type: POSTS_FETCHING_START});
export const postsSuccess = (posts) => ({ type: POSTS_FETCHING_SUCCESS, posts});

export const postsFetch = () => async dispatch => {
  dispatch (postsStart());

  const response = await fetch("https://warsawjs-21-api.herokuapp.com/posts/")
    .then(res => res.json());


  console.log(response.posts);

  dispatch(postsSuccess(response.posts));
}
