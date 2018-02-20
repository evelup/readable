import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import moment from 'moment';
import {
  Padding,
  Heading,
  Section,
  Row,
  Button,
  Comment
} from '../components';
import {
  fetchPost,
  deletePost,
  fetchComments,
  addComment,
  editComment,
  deleteComment
} from '../actions';
import CommentForm from './CommentForm';
import { v4 } from 'uuid';

class PostView extends Component {
  state = {
    modal: false,
  };

  componentDidMount(){
    this.props.fetchPost(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
  }

  handleDelete = id => e => {
    console.log('id', id);
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
    console.log('@', form)
    if (form.id) {
      this.props.editComment({
        id: form.id,
        body: form.body,
        timestamp: form.timestamp
      })
    } else {
      const uuid = v4();
      const date = moment();
      form = {
        ...form,
        id: uuid,
        timestamp: date,
      }
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

  closeModal = e => {
    this.setState({ modal: false })
  };

  render() {
    const { posts, comments } = this.props;
    const { match } = this.props;

    const post = posts.find(el => el.id === match.params.id);
    if (!post) {
      return <Padding>Loading...</Padding>
    }

    return (
      <Padding>
        <Section>
          <Link to="/">Go back</Link>
        </Section>
        <Section>
          <Row justifyContent="space-between">
            <Heading>{post.title}</Heading>
            <Row alignItems="center" justifyContent="space-between">
              <Button
                path={`/posts/${match.params.id}/edit`}
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
          <p className="score">Votescore: {post.voteScore}</p>
          <p>{post.body}</p>
        </Section>
        <Section>
          <Row
            justifyContent="space-between"
            alignItems="center"
          >
            <h3>All comments</h3>
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
)(PostView);
