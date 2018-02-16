import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  payload: categories
});

export const fetchCategories = () => dispatch => {
  return ReadableAPI.getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
};

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  payload: posts
});

export const fetchPosts = () => dispatch => {
  return ReadableAPI.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
};
