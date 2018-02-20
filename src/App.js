import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CategoryView from './pages/CategoryView';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import './App.css';

const Form = () => (<div>Create/Edit View</div>);

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/category/:path" component={CategoryView} />
        <Route exact path="/posts/new" component={PostForm} />
        <Route exact path="/posts/:id/edit" component={PostForm} />
        <Route exact path="/posts/:id" component={PostView} />
      </Switch>
    );
  }
}

export default App;
