import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Post,
  Padding,
} from '../components';

class PostView extends Component {
  render() {
    return (
      <Padding>
        <Post />
      </Padding>
    )
  }
}

export default connect(

)(PostView);
