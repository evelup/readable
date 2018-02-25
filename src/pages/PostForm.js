import React, {Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { v4 } from 'uuid';
import {
  Padding,
  Section,
  Input,
  Button,
} from '../components';
import {
  fetchCategories,
  addPost,
  editPost,
  fetchPost
} from '../actions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
    this.id = props.match.params.id;
  }

  componentDidMount() {
    this.props.fetchCategories();
    if (this.id) {
      this.props.fetchPost(this.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    if (this.id) {
      const post = this.props.posts.find(post => post.id === this.id);
      if (post) {
        this.setState({ form: post });
      }
    }
  }

  handleSubmit = id => e => {
    e.preventDefault();
    const uuid = v4();
    if (!this.id) {
      this.props.addPost({
        ...this.state.form,
        id: uuid,
        timestamp: +new Date(),
      });
    } else {
      this.props.editPost({
        ...this.state.form,
      })
    }

    this.props.history.push('/');
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  };

  handleGoBack = e => {
    this.props.history.goBack()
  };

  render() {
    const { categories, posts, match } = this.props;
    const { form } = this.state;

    const options = categories.map(category => {
      return category.name
    });

    options.unshift('disabled');

    return (
      <Padding>
        <Section>
          <div onClick={this.handleGoBack} className="link">Go back</div>
        </Section>
        <h3>New post</h3>
        <form onSubmit={this.handleSubmit(form.id)}>
          <Input
            label="Author"
            name="author"
            onChange={!this.id && this.handleChange}
            value={form.author}
            required
            isEdited={this.id}
          />
          <Input
            label="Category"
            name="category"
            type="select"
            options={options}
            onChange={!this.id && this.handleChange}
            value={form.category}
            required
            isEdited={this.id}
          />
          <Input
            label="Title"
            name="title"
            onChange={this.handleChange}
            value={form.title}
            required
          />
          <Input
            label="Content"
            name="body"
            type="textarea"
            onChange={this.handleChange}
            value={form.body}
            required
          />
          <Input
            label="Submit"
            type="submit"
          />
        </form>
      </Padding>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    addPost: data => dispatch(addPost(data)),
    editPost: data => dispatch(editPost(data)),
    fetchPost: data => dispatch(fetchPost(data)),
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,

)(withRouter(PostForm));
