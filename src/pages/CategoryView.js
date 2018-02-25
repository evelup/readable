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
        <Section>
          <Link to="/">Go back</Link>
        </Section>
        <Row alignItems="center" justifyContent="space-between">
          <Heading>{`All post from ${this.category} category`}</Heading>
          <Button path="/posts/new">New Post</Button>
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
