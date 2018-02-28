import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPostsFromCategory} from '../actions';
import {
  Post,
  Padding,
  Heading,
  Section,
  Button,
  Row,
  Input
} from '../components';
import { Link } from 'react-router-dom';
import { sortPosts } from '../utils/helpers';

class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.category = props.match.params.category;
    this.state = {
      sort: 'date'
    };
  }
  componentDidMount() {
    this.props.fetchPostsFromCategory(this.category)
  }

  handleSort = e => {
    this.setState({ sort: e.target.value })
  };

  render() {
    const { posts } = this.props;
    const postsSorted = sortPosts(posts, this.state.sort);

    return (
      <Padding>
        <Section>
          <Link to="/">Go back</Link>
        </Section>
        <Row alignItems="center" justifyContent="space-between">
          <Heading>{`All post from ${this.category} category`}</Heading>
          <Button path={`/${this.category}/new-post`}>New Post</Button>
        </Row>
        <Row>
          <Input
            label="Sort by"
            name="sort"
            type="select"
            options={['date', 'votes']}
            value={this.state.sort}
            onChange={this.handleSort}
            inline
          />
        </Row>
        {postsSorted.map(post => {
          return (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              timestamp={post.timestamp}
              voteScore={post.voteScore}
              deleted={post.deleted}
              category={post.category}
              commentCount={post.commentCount}
            >
              {post.body}
            </Post>
          )
        })}
      </Padding>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostsFromCategory: data => dispatch(fetchPostsFromCategory(data))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView);
