import { combineReducers } from "redux";

import userReducer from "./user";
import postsReducer from "./posts";
import commentsReducer from "./comments";

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
});