import { createStore, applyMiddleware, combineReducers } from "redux";
import reducers from "./reducer/user/";
import thunk from "redux-thunk";
import logger from "redux-logger";
import userReducer from "./reducer/user/index.js";
import postsReducer from "./reducer/posts/index.js";
import commentsReducer from "./reducer/comments/index";

const store = createStore(
  combineReducers({
    user: userReducer,
    posts: postsReducer,
    comments: commentsReducer,
  }),
  applyMiddleware(thunk, logger)
);

export default store;
