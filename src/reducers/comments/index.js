import { FETCH_START, FETCH_SUCCESS, POST_SUCCESS } from "../../actions/comments/";

const initialState = {
  comments: {},
  fetching: false,
};

const reducer = (state = initialState, action) => {
  const newState = {...state};
  newState.comments = {...newState.comments};

  switch (action.type) {
    case FETCH_START: {
      newState.fetching = true;

      break;
    }

    case FETCH_SUCCESS: {
      newState.fetching = false;
      const { postId, comments } = action.payload;

      newState.comments[postId] = comments;
      break;
    }

    case POST_SUCCESS: {
      newState.fetching = false;
      const { postId, commentData } = action.payload;
      const postComments = newState.comments[postId];

      if (!postComments) {
        newState.comments[postId] = [];
      }
      
      newState.comments[postId].push(commentData);

      break;
    }

    // no default
  }

  return newState;
};

export default reducer;