import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';

class HomePage extends Component {

  render() {
    return (
      <Router>
        <div>
          <p1>Welcome to the Home Page</p1>
          <form>
          <label type='text'>Search SEEDS Database: </label>
          <a href="/SearchArticles" class="button">Search Articles</a>
          </form>
          <form>
          <label type='text'>See All Articles: </label>
          <a href="/ShowAllArticles" class="button">Show All Articles</a>
          </form>
        </div>
      </Router>
    );
  }
}

export default HomePage;