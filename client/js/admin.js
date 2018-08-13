// admin.js - Entry point for the admin app
// ========================================

import '../less/admin.less'; // Removed by Webpack at compile time
import React, {Component}                               from 'react';
import ReactDOM                                         from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AdminHome                                        from './pages/AdminHome';
import Login                                            from './pages/Login';
import AdminAlbum                                       from './pages/AdminAlbum';
import AdminAlbumNew                                    from './pages/AdminAlbumNew';
import AdminAlbumEdit                                   from './pages/AdminAlbumEdit';

class App extends Component {
  render() {
    return (
      <Router basename="/admin">
        <div className="grid">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li>
              <Link to="/albums">Albums</Link>
              <ul>
                <li><Link to="/albums/new">New Album</Link></li>
              </ul>
            </li>
          </ul>
          <Route exact path="/" component={AdminHome}/>
          <Route path="/login" component={Login} />
          <Switch>
            <Route exact path="/albums" component={AdminAlbum} />
            <Route path="/albums/new" component={AdminAlbumNew} />
            <Route path="/albums/:id/edit" component={AdminAlbumEdit} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
