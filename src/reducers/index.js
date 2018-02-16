import { combineReducers } from 'redux';
import { getAllCategories } from '../utils/ReadableAPI';
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
} from "../actions";

const categoriesInitialState = [];
const postsInitialState = [];

function categories(state = categoriesInitialState, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return action.payload
  }
  return state
}

function posts(state = postsInitialState, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      // console.log('action.payload', action.payload)
      return action.payload
  }
  return state
}

export default combineReducers({
  categories,
  posts
});
