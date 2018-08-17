// admin.js - Entry point for the admin app
// ========================================

import '../less/admin.less'; // Removed by Webpack at compile time
import React, {Component}                               from 'react';
import ReactDOM                                         from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AdminHome                                        from './pages/AdminHome';
import Login                                            from './pages/Login';
import AdminAlbum                                       from './pages/AdminAlbum';
import AdminAlbumEdit                                   from './pages/AdminAlbumEdit';
import AdminPost                                        from './pages/AdminPost';
import AdminPostNew                                     from './pages/AdminPostNew';

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
            <li>
              <Link to="/posts">Posts</Link>
              <ul>
                <li><Link to="/posts/new">New Post</Link></li>
              </ul>
            </li>
          </ul>
          <Route exact path="/" component={AdminHome}/>
          <Route path="/login" component={Login} />
          <Switch>
            <Route exact path="/albums" component={AdminAlbum} />
            <Route path="/albums/new" component={AdminAlbumEdit} />
            <Route path="/albums/:id/edit" component={AdminAlbumEdit} />
          </Switch>
          <Switch>
            <Route exact path="/posts" component={AdminPost} />
            <Route path="/posts/new" component={AdminPostNew} />
            <Route path="/posts/:id/edit" component={AdminPostNew} />
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
