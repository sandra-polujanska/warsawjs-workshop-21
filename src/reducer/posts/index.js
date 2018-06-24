import { POSTS_FETCHING_START, POSTS_FETCHING_SUCCESS} from "../../action/posts";

const initialState = {
  posts: [],
  fetching: false,
}

const postsReducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case POSTS_FETCHING_START: {
      newState.fetching = true;
      return newState;
    }
    case POSTS_FETCHING_SUCCESS: {
      newState.posts = action.posts;
      newState.fetching = false;

      return newState;
    }
  }
  return state;
}

export default postsReducer;
