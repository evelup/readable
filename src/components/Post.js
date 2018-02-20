import React, { Component } from 'react';
import { Box, Row } from './';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withRouter } from 'react-router-dom'


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
      deleted,
    } = this.props;

    return (
      <Box id={id} deleted={deleted} onClick={this.handlePush(id)}>
        <Row justifyContent="space-between" alignItems="center">
          <Row>
            <h3>{title}</h3>

            <p className="score margin-left">/ {voteScore} votes</p>
          </Row>
          <p>{moment(timestamp).format("DD-MM-YYYY")}</p>
        </Row>
        <p className="gray">Author: {author}</p>
        <p>Category: {category}</p>
        {/*<p>{children}</p>*/}
        <Link to={`/posts/${id}`}>View more</Link>
      </Box>
    )
  }

  handlePush = id => e => {
    this.props.history.push(`/posts/${id}`)
  };
}

export default withRouter(Post);
