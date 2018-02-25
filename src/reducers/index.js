import { combineReducers } from 'redux';
import { getAllCategories } from '../utils/ReadableAPI';
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  DELETE_COMMENT,
  UPDATE_POST_COMMENT_COUNT,
} from "../actions";

const categoriesInitialState = [];
const postsInitialState = [];
const commentsInitialState = [];

function categories(state = categoriesInitialState, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return action.payload
    default:
      return state
  }
}

function posts(state = postsInitialState, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      // console.log('action.payload', action.payload);
      return action.payload;
    case RECEIVE_POST: {
      const newState = state.slice();
      const index = newState.findIndex(el => el.id === action.payload.id);
      if (index >= 0) {
        newState.splice(index, 1, action.payload);
      } else {
        newState.push(action.payload);
      }
      return newState;
    }
    case UPDATE_POST_COMMENT_COUNT: {
      console.log('updateCC', action.payload.id);
      const newState = state.slice();
      const post = newState.find(el => el.id === action.payload.id);
      if (post) {
        if (action.payload.upOrDown === 'up') {
          post.commentCount = post.commentCount + 1
        } else {
          post.commentCount = post.commentCount - 1
        }
      }
      return newState;
    }
    default:
      return state
  }
}

function comments(state = commentsInitialState, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return action.payload;
    case RECEIVE_COMMENT: {
      const newState = state.slice();
      const index = newState.findIndex(el => el.id === action.payload.id);
      if (index >= 0) {
        newState.splice(index, 1, action.payload)
      } else {
        newState.push(action.payload);
      }
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = state.slice();
      const index = newState.findIndex( el => el.id === action.payload.id);
      // console.log('index', index);
      if (index >= 0) {
        newState.splice(index, 1)
      }
      return newState;
    }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
});
