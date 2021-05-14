import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import ShowAllArticles from './components/ShowAllArticles';
import HomePage from './components/HomePage';
import SearchArticles from './components/SearchArticles';
import ShowResultArticles from './components/ShowResultArticles';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/ShowAllArticles' component={ShowAllArticles} />
          <Route exact path='/SearchArticles' component={SearchArticles} />
          <Route exact path='/ShowResultArticles' component={ShowResultArticles} />
        </div>
      </Router>
    );
  }
}

export default App;