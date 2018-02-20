import React from 'react';
import moment from 'moment';
import {
  Box,
  Row
} from './'

const Comment = ({
  id,
  children,
  author,
  timestamp,
  voteScore,
  parentId,
  deleted,
  parentDeleted,
  onDelete,
  onEdit,
}) => {
  return (
    <Box key={id}>
      <Row justifyContent="space-between">
        <p className="gray">
          {author} commented on {moment(timestamp).format("DD-MM-YYYY")}
        </p>
        <Row>
          <div
            className="link edit margin-right"
            onClick={() => onEdit(id)}
          >
            Edit
          </div>
          <div
            className="link delete"
            onClick={e => onDelete(id)}
          >
            Delete
          </div>
        </Row>
      </Row>
      <p>{children}</p>
      <p className="score">VoteScore {voteScore}</p>
    </Box>
  )
};


export default Comment;
