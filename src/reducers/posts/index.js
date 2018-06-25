import { FETCH_START, FETCH_SUCCESS, POST_SUCCESS } from "../../actions/posts/index";

const initialState = {
  /*
  posts: [],
  /*/
  posts: [{"id":"5b2be7a143fa4200147ea9eb","image":"http://warsawjs-21-api.herokuapp.com/static/instgr.png","title":"My first UI project!","owner":"bibixx","date":1529604001151}],
  // */
  fetching: false,
};

const reducer = (state = initialState, action) => {
  const newState = {...state};
  newState.posts = [...newState.posts].map(p => ({...p}));

  switch (action.type) {
    case FETCH_START: {
      newState.fetching = true;

      break;
    }

    case FETCH_SUCCESS: {
      newState.posts = action.payload;
      newState.fetching = false;

      break;
    }

    case POST_SUCCESS: {
      const post = action.payload;
      newState.posts.push(post);

      break;
    }

    // no default
  }

  return newState;
};

export default reducer;