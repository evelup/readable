import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_POST_COMMENT_COUNT = 'UPDATE_POST_COMMENT_COUNT';

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  payload: comments,
});
export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  payload: comment
});
export const deleteCommentInStore = comment => ({
  type: DELETE_COMMENT,
  payload: comment
});
export const updatePostCommentCount = (id, upOrDown) => ({
  type: UPDATE_POST_COMMENT_COUNT,
  payload: {
    id,
    upOrDown
  }
});

export const fetchComments = id => dispatch => {
  return ReadableAPI.getComments(id)
    .then(comments => dispatch(receiveComments(comments)))
};
export const fetchComment = id => dispatch => {
  return ReadableAPI.getSingleComment(id)
    .then(comment => dispatch(receiveComment(comment)))
};
export const addComment = form => dispatch => {
  return ReadableAPI.addComment(form)
    .then(comment => {
      dispatch(receiveComment(comment))
      return comment
    })
    .then(comment => dispatch(updatePostCommentCount(comment.parentId, 'up')))
};
export const editComment = form => dispatch => {
  return ReadableAPI.editComment(form)
    .then(comment => dispatch(receiveComment(comment)))
};
export const deleteComment = id => dispatch => {
  return ReadableAPI.deleteComment(id)
    .then(comment => {
      dispatch(deleteCommentInStore(comment))
      return comment
    })
    .then(comment => dispatch(updatePostCommentCount(comment.parentId, 'down')))
};
export const voteUpComment = id => dispatch => {
  return ReadableAPI.voteUpComment(id)
    .then(comment => dispatch(receiveComment(comment)))
};
export const voteDownComment = id => dispatch => {
  return ReadableAPI.voteDownComment(id)
    .then(comment => dispatch(receiveComment(comment)))
};


