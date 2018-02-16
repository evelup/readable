import React, { Component } from 'react';
import { Box, Row } from './';
import { Link } from 'react-router-dom';
import moment from 'moment';


class Post extends Component {
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
      deleted
    } = this.props;

    return (
      <Box id={id} deleted={deleted}>
        <Row justifyContent="space-between" alignItems="center">
          <Row>
            <h3>{title}</h3>

            <p className="score">/ {voteScore} votes</p>
          </Row>
          <p>{moment(timestamp).format("DD-MM-YYYY")}</p>
        </Row>
        <p className="gray">{author}</p>
        <p>Category: {category}</p>
        <p>{children}</p>
        <Link to={`/posts/${id}`}>View more</Link>
      </Box>
    )
  }
}

export default Post;
