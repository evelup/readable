import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Padding,
  Heading,
  Box,
  Row,
  Button,
  Post,
  Section
} from '../components';
import {
  fetchCategories,
  fetchPosts,
} from '../actions';
import { connect } from 'react-redux';

class Home extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const { categories, posts } = this.props;
    // console.log('posts', posts);

    return (
      <Padding>
        <Section id="categories">
          <Heading>Categories</Heading>
          <Row>
            {categories.map(category => {
              return (
                <Link key={category.name} to={`/category/${category.path}`}>
                  <Box>{category.name}</Box>
                </Link>
              )
            })}
          </Row>
        </Section>
        <Section id="posts">
          <Row alignItems="center" justifyContent="space-between">
            <Heading>All Posts</Heading>
            <Button path="/posts/new">New Post</Button>
          </Row>
          {posts.map(post => {
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
        </Section>
      </Padding>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: data => dispatch(fetchCategories(data)),
    fetchPosts: data => dispatch(fetchPosts(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
