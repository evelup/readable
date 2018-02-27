import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import {
  Padding,
  Heading,
  Section,
  Row,
  Button,
  Comment,
  VoteControl
} from '../components';
import {
  fetchPost,
  deletePost,
  fetchComments,
  addComment,
  editComment,
  deleteComment,
  voteUpComment,
  voteDownComment,
  voteUpPost,
  voteDownPost
} from '../actions';
import CommentForm from './CommentForm';
import { v4 } from 'uuid';

class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.update = 0;
  }

  componentDidMount(){
    this.props.fetchPost(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
  }

  componentWillReceiveProps() {
    this.update += 1;
    // console.log('receive props this.update', this.update)
  }


  handleDelete = id => e => {
    // console.log('id', id);
    this.props.deletePost(id);
  };

  handleModal = e => {
    this.setState({ modal: true })
  };

  handleAddOrEditComment = form => {
    form = {
      ...form,
      parentId: this.props.match.params.id,
    };
    // console.log('@', form)
    if (form.id) {
      this.props.editComment({
        id: form.id,
        body: form.body,
        timestamp: form.timestamp
      })
    } else {
      const uuid = v4();
      const date = +new Date();
      form = {
        ...form,
        id: uuid,
        timestamp: date,
      };
      this.props.addComment(form);
    }
    this.setState({
      modal: false,
      id: false
    })
  };

  handleDeleteComment = id => {
    // console.log('delete id', id);
    this.props.deleteComment(id);
  };

  handleEditComment = id => {
    this.setState({
      modal: true,
      id
    });
  };

  handleVoteUpComment = id => e => {
    this.props.voteUpComment(id)
  };

  handleVoteDownComment = id => e => {
    this.props.voteDownComment(id)
  };

  handleVoteUpPost = id => e => {
    this.props.voteUpPost(id)
  };

  handleVoteDownPost = id => e => {
    this.props.voteDownPost(id)
  };

  closeModal = e => {
    this.setState({ modal: false })
  };

  handleGoBack = e => {
    this.props.history.goBack()
  };

  render() {
    const { posts, comments } = this.props;
    const { match } = this.props;
    // console.log('render this.update', this.update)
    const post = posts.find(el => el.id === match.params.id);
    if (!post) {
      if (this.update === 2) {
        return (
          <Padding>
            <Section>
              <div onClick={this.handleGoBack} className="link">Go back</div>
            </Section>
            <Heading>404</Heading>
            <p>This page doesn't exist</p>
          </Padding>
        )
      }
      return <Padding>Loading...</Padding>
    }
    // console.log('post voteScore', post.voteScore);
    return (
      <Padding>
        <Section>
          <div onClick={this.handleGoBack} className="link">Go back</div>
        </Section>
        <Section>
          <Row justifyContent="space-between">
            <Heading>{post.title}</Heading>
            <Row alignItems="center" justifyContent="space-between">
              <Button
                path={`/${match.params.id}/edit`}
                margin="margin-right"
              >
                Edit
              </Button>
              <Button
                path={'/'}
                black
                onClick={this.handleDelete(post.id)}
              >
                Delete
              </Button>
            </Row>
          </Row>
          <p className="gray">Published: {moment(post.timestamp).format("DD-MM-YYYY")}</p>
          <p className="gray">Author: {post.author}</p>
          <p className="gray">Category: {post.category}</p>
          <Row alignItems="center" className="margin-bottom-small">
            <p className="score no-margin margin-right">Votes: {post.voteScore}</p>
            <VoteControl
              voteScore={post.voteScore}
              voteUp={this.handleVoteUpPost(post.id)}
              voteDown={this.handleVoteDownPost(post.id)}
            />
          </Row>
          <p>{post.body}</p>
        </Section>
        <Section>
          <Row
            justifyContent="space-between"
            alignItems="center"
          >
            <h3>All comments ({post.commentCount})</h3>
            <div
              className="button margin-bottom"
              onClick={this.handleModal}
            >
              Add comment
            </div>
          </Row>
          {comments.map(comment => {
            return (
              <Comment
                id={comment.id}
                author={comment.author}
                timestamp={comment.timestamp}
                voteScore={comment.voteScore}
                parentId={comment.parentId}
                deleted={comment.deleted}
                parentDeleted={comment.parentDeleted}
                onDelete={this.handleDeleteComment}
                onEdit={this.handleEditComment}
                voteUp={this.handleVoteUpComment(comment.id)}
                voteDown={this.handleVoteDownComment(comment.id)}
              >
                {comment.body}
              </Comment>
            )
          })}
        </Section>
        {this.state.modal &&
          <div className="overlay">
            <CommentForm
              onSubmit={this.handleAddOrEditComment}
              id={this.state.id}
              onClose={this.closeModal}
            />
          </div>
        }
      </Padding>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: data => dispatch(fetchPost(data)),
    deletePost: data => dispatch(deletePost(data)),
    fetchComments: data => dispatch(fetchComments(data)),
    addComment: data => dispatch(addComment(data)),
    editComment: data => dispatch(editComment(data)),
    deleteComment: data => dispatch(deleteComment(data)),
    voteUpComment: data => dispatch(voteUpComment(data)),
    voteDownComment: data => dispatch(voteDownComment(data)),
    voteUpPost: data => dispatch(voteUpPost(data)),
    voteDownPost: data => dispatch(voteDownPost(data)),
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostView));
