import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const DELETE_POST = 'DELETE_POST';

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  payload: posts
});
export const receivePost = (post) => ({
  type: RECEIVE_POST,
  payload: post
});
export const deletePostInStore = post => ({
  type: DELETE_POST,
  payload: post
});

export const fetchPosts = () => dispatch => {
  return ReadableAPI.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
};
export const fetchPostsFromCategory = category => dispatch => {
  return ReadableAPI.getPostFromCategory(category)
    .then(posts => dispatch(receivePosts(posts)))
};
export const fetchPost = id => dispatch => {
  return ReadableAPI.getSinglePost(id)
    .then(post => dispatch(receivePost(post)))
};
export const addPost = form => dispatch => {
  return ReadableAPI.addPost(form)
    .then(form => dispatch(receivePost(form)))
};
export const editPost = form => dispatch => {
  return ReadableAPI.editPost(form)
    .then(comment => dispatch(receivePost(comment)))
};
export const deletePost  = id => dispatch => {
  return ReadableAPI.deletePost(id)
    .then(post => dispatch(deletePostInStore(post)))
};
export const voteUpPost = id => dispatch => {
  return ReadableAPI.voteUpPost(id)
    .then(post => dispatch(receivePost(post)))
};
export const voteDownPost= id => dispatch => {
  return ReadableAPI.voteDownPost(id)
    .then(post => dispatch(receivePost(post)))
};
