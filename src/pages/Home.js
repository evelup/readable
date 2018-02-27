import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Padding,
  Heading,
  Box,
  Row,
  Button,
  Post,
  Section,
  Input
} from '../components';
import {
  fetchCategories,
  fetchPosts,
} from '../actions';
import { connect } from 'react-redux';

class Home extends Component {
  state = {
    sort: 'date'
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  handleSort = e => {
    this.setState({ sort: e.target.value })
  };

  render() {
    const { categories, posts } = this.props;
    let postsSorted = posts.slice();
    if (this.state.sort === 'votes') {
      postsSorted.sort(function(a,b) {
        if (a.voteScore < b.voteScore) {
          return 1
        } else if (a.voteScore === b.voteScore) {
          return 0
        } else {
          return -1
        }
      })
    } else {
      postsSorted.sort(function(a, b) {
        // console.log('compare', a.timestamp, b.timestamp)
        if (a.timestamp < b.timestamp) {
          return 1
        } else if (a.timestamp === b.timestamp) {
          return 0
        } else {
          return -1
        }
      });
    }

    return (
      <Padding>
        <Section id="categories">
          <Heading>Categories</Heading>
          <Row>
            {categories.map(category => {
              return (
                <Link key={category.name} to={`/${category.path}`}>
                  <Box className="margin-right">{category.name}</Box>
                </Link>
              )
            })}
          </Row>
        </Section>
        <Section id="posts">
          <Row alignItems="center" justifyContent="space-between">
            <Heading>All posts</Heading>
            <Button path="/new-post">New Post</Button>
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
            // console.log('#commentCount', post.commentCount);
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
