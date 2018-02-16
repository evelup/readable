import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryView from './pages/CategoryView';
import PostView from './pages/PostView';
import './App.css';

const Form = () => (<div>Create/Edit View</div>);

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/category/:path" component={CategoryView} />
        <Route exact path="/posts/:id" component={PostView} />
        <Route exact path="/form" component={Form} />
      </div>
    );
  }
}

export default App;
