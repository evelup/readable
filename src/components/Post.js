import React, { Component } from 'react';
import { Box, Row, VoteControl } from './';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  voteUpPost,
  voteDownPost
} from '../actions';


class Post extends Component {

  handleVoteUpPost = id => e => {
    console.log('voteUp', id);
    this.props.voteUpPost(id)
  };

  handleVoteDownPost = id => e => {
    this.props.voteDownPost(id)
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
          <p>{moment(timestamp).format("DD-MM-YYYY")}</p>
        </Row>
        <Row alignItems="center margin-bottom-small">
          <p className="score no-margin margin-right">Votes: {voteScore}</p>
          <VoteControl
            voteScore={voteScore}
            voteUp={this.handleVoteUpPost(id)}
            voteDown={this.handleVoteDownPost(id)}
          />
        </Row>
        <p>Author: {author}</p>
        <p>Category: {category}</p>
        <p>Comments: {commentCount}</p>
        {/*<p>{children}</p>*/}
        <Link to={`/posts/${id}`}>View more</Link>
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
