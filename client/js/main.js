// main.js - Entry point for the entire client-side app
// ====================================================

import '../less/style.less'; // Removed by Webpack at compile time
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Nav from './components/Nav';
import HomeContainer from './pages/Home';
import LogContainer from './pages/Log';
import AlbumContainer from './pages/Albums';
import AlbumDetail from './pages/AlbumDetail';

// Main container for the entire application
// -----------------------------------------
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Router>
        <div className="grid">
          <Helmet>
            <title>Homepage</title>
          </Helmet>
          <Nav />
          <Route exact path="/" component={HomeContainer}/>
          <Switch location={this.props.location}>
            <Route exact path="/log" component={LogContainer}/>
            <Route path="/log/:slug" component={LogContainer}/>
          </Switch>
          <Switch location={this.props.location}>
            <Route exact path="/albums" component={AlbumContainer} />
            <Route path="/albums/:id" component={AlbumDetail} />
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
