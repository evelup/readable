import React from 'react';
import { Box, Row, VoteControl } from './';
import { Link } from 'react-router-dom';
import { dateFormat } from '../utils/helpers'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  voteUpPost,
  voteDownPost,
  deletePost,
  editComment
} from '../actions';

const Post = ({ // destructure props as parameters
  title,
  author,
  body,
  timestamp,
  voteScore,
  category,
  children,
  id,
  deleted,
  commentCount,
  voteUpPost,
  voteDownPost,
  deletePost,
  history,
}) => {

  const handleVoteUpPost = id => e => {
    voteUpPost(id)
  };

  const handleVoteDownPost = id => e => {
    voteDownPost(id)
  };

  const handleDelete = id => e => {
    deletePost(id);
  };

  const handleEdit = (id, category) => e => {
    history.push(`/${category}/${id}/edit`)
  };

  const handlePush = id => e => {
    history.push(`/posts/${id}`)
  };

  return (
    <Box id={id} deleted={deleted} >
      <Row justifyContent="space-between" alignItems="center">
        <h3>{title}</h3>
        <Row>
          <div
            className="link edit margin-right"
            onClick={handleEdit(id, category)}
          >
            Edit
          </div>
          <div
            className="link delete"
            onClick={handleDelete(id)}
          >
            Delete
          </div>
        </Row>
      </Row>
      <p>Published on {dateFormat(timestamp)}</p>
      <p>Author: {author}</p>
      <p>Category: {category}</p>
      <p>Comments: {commentCount}</p>
      <Row alignItems="center" justifyContent="space-between">
        <Row alignItems="center">
          <p className="score no-margin margin-right">Votes: {voteScore}</p>
          <VoteControl
            voteScore={voteScore}
            voteUp={handleVoteUpPost(id)}
            voteDown={handleVoteDownPost(id)}
          />
        </Row>
        <Link to={`/${category}/${id}`} className="button ghost">View more</Link>
      </Row>
    </Box>
  )
};

function mapDispatchToProps(dispatch) {
  return {
    voteUpPost: data => dispatch(voteUpPost(data)),
    voteDownPost: data => dispatch(voteDownPost(data)),
    deletePost: data => dispatch(deletePost(data)),
    editComment: data => dispatch(editComment(data)),
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post));
