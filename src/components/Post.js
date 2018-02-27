import React, { Component } from 'react';
import { Box, Row, VoteControl } from './';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  voteUpPost,
  voteDownPost,
  deletePost,
  editComment
} from '../actions';


class Post extends Component {

  handleVoteUpPost = id => e => {
    console.log('voteUp', id);
    this.props.voteUpPost(id)
  };

  handleVoteDownPost = id => e => {
    this.props.voteDownPost(id)
  };

  handleDelete = id => e => {
    this.props.deletePost(id);
  };

  handleEdit = (id, category) => e => {
    this.props.history.push(`/${category}/${id}/edit`)
  };

  render() {
    const {
      title,
      author,
      body,
      timestamp,
      voteScore,
      category,
      children,
      id,
      deleted,
      commentCount
    } = this.props;

    return (
      <Box id={id} deleted={deleted} >
        <Row justifyContent="space-between" alignItems="center">
          <h3>{title}</h3>
          <Row>
            <div
              className="link edit margin-right"
              onClick={this.handleEdit(id, category)}
            >
              Edit
            </div>
            <div
              className="link delete"
              onClick={this.handleDelete(id)}
            >
              Delete
            </div>
          </Row>
        </Row>
        <p>Published on {moment(timestamp).format("DD-MM-YYYY")}</p>
        <p>Author: {author}</p>
        <p>Category: {category}</p>
        <p>Comments: {commentCount}</p>
        <Row alignItems="center" justifyContent="space-between">
          <Row alignItems="center">
            <p className="score no-margin margin-right">Votes: {voteScore}</p>
            <VoteControl
              voteScore={voteScore}
              voteUp={this.handleVoteUpPost(id)}
              voteDown={this.handleVoteDownPost(id)}
            />
          </Row>
          <Link to={`/${category}/${id}`} className="button ghost">View more</Link>
        </Row>

      </Box>
    )
  }

  handlePush = id => e => {
    this.props.history.push(`/posts/${id}`)
  };
}


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
