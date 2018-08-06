// main.js - Entry point for the entire client-side app
// ====================================================

import '../less/style.less'; // Removed by Webpack at compile time
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Nav from './components/Nav.jsx';

const Home = () => (
  <h1>SAP Home Route</h1>
);

const Log = () => (
  <h1>SAP Log Route</h1>
);

// Main container for the entire application
// -----------------------------------------
class App extends Component {
  render() {
    return(
      <Router>
        <Nav />
        <Route exact path="/" component={Home}/>
        <Route path="/log" component={Log}/>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
