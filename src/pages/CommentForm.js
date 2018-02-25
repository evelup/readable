import React, { Component } from 'react';
import {
  Box,
  Input,
  Padding
} from '../components';

import { fetchComment } from "../actions";
import { connect } from 'react-redux';

class CommentForm extends Component {
  state = {
    form: {}
  };

  componentDidMount() {
    if (this.props.id) {
      this.props.fetchComment(this.props.id);
    }
  };

  componentWillReceiveProps() {
    if (this.props.id) {
      let comment = this.props.comments.find(el => el.id === this.props.id);
      this.setState({
        form: comment
      })
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  };

  handleSubmit = e  => {
    e.preventDefault();

    console.log('#', this.state.form, this.props.id);
    let data = {
      ...this.state.form,
    };
    this.props.onSubmit(data)
  };

  render() {
    const { comments, id, onClose } = this.props;

    // console.log('form', this.state.form);

    return (
      <div className="modal">
        <div className="close" onClick={onClose}>
          <div className="line" />
          <div className="line" />
        </div>
        <Padding>
          <h3 className="margin-bottom">Your comment</h3>
          <form onSubmit={this.handleSubmit}>
            <Input
              label="Name"
              name="author"
              onChange={!this.props.id && this.handleChange}
              required
              value={this.state.form.author}
              isEdited={this.props.id}
            />
            <Input
              label="Comment"
              name="body"
              type="textarea"
              onChange={this.handleChange}
              required
              value={this.state.form.body}
            />
            <Input
              label="Submit"
              type="submit"
            />
          </form>
        </Padding>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchComment: data => dispatch(fetchComment(data))
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
