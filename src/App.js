import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CategoryView from './pages/CategoryView';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new-post" component={PostForm} />
        <Route exact path="/:category/new-post/" component={PostForm} />
        <Route exact path="/:category/:id/edit" component={PostForm} />
        <Route exact path="/:category/:id" component={PostView} />
        <Route exact path="/:category" component={CategoryView} />
      </Switch>
    );
  }
}

export default App;
