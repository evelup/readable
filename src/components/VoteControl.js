import React, { Component } from 'react';
import { Row } from './'

class VoteControl extends Component {
  state = {
    voteScore: this.props.voteScore
  };

  handleUp = e => {
    this.props.voteUp();
  };

  handleDown = e => {
    this.props.voteDown();
  };

  render() {
    // console.log('voteScore', this.state.voteScore);
    const { className, onClick } = this.props;
    return (
      <Row>
        <div
          className="control margin-right"
          onClick={this.handleUp}
        >
          +
        </div>
        <div
          className="control minus"
          onClick={this.handleDown}
        >
          &ndash;
        </div>
      </Row>
    )
  }
}

export default VoteControl;
