import React from 'react';
import {
  Box,
  Row,
  VoteControl
} from './'
import { dateFormat } from '../utils/helpers'

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
  voteUp,
  voteDown
}) => {
  return (
    <Box key={id} id={id}>
      <Row justifyContent="space-between">
        <p className="gray">
          {author} commented on {dateFormat(timestamp)}
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
      <Row alignItems="center">
        <p className="score no-margin margin-right">Votes: {voteScore}</p>
        <VoteControl
          voteScore={voteScore}
          voteUp={voteUp}
          voteDown={voteDown}
        />
      </Row>
    </Box>
  )
};


export default Comment;
