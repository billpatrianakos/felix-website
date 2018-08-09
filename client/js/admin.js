// admin.js - Entry point for the admin app
// ========================================

import '../less/admin.less'; // Removed by Webpack at compile time
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AdminHome from './pages/AdminHome';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <Router basename="/admin">
        <div className="grid">
          <Helmet>
            <title>Admin</title>
          </Helmet>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
          <Route exact path="/" component={AdminHome}/>
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
