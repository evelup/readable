import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
// export const SAVE_POST = 'SAVE_POST';
// export const DELETE_POST = 'DELETE_POST';

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

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  payload: post
});

export const fetchPost = id => dispatch => {
  return ReadableAPI.getSinglePost(id)
    .then(post => dispatch(receivePost(post)))
};

// export const savePost = (form) => ({
//   type: SAVE_POST,
//   payload: form
// });

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
    // .then(id => dispatch(deletePost(id)))
};

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  payload: comments,
});

export const fetchComments = id => dispatch => {
  return ReadableAPI.getComments(id)
    .then(comments => dispatch(receiveComments(comments)))
};

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  payload: comment
});

export const fetchComment = id => dispatch => {
  return ReadableAPI.getSingleComment(id)
    .then(comment => dispatch(receiveComment(comment)))
};

export const addComment = form => dispatch => {
  return ReadableAPI.addComment(form)
    .then(form => dispatch(receiveComment(form)))
};

export const editComment = form => dispatch => {
  return ReadableAPI.editComment(form)
    .then(comment => dispatch(receiveComment(comment)))
};

export const deleteCommentInStore = comment => ({
  type: DELETE_COMMENT,
  payload: comment
});

export const deleteComment = id => dispatch => {
  return ReadableAPI.deleteComment(id)
    .then(comment => dispatch(deleteCommentInStore(comment)))
};

