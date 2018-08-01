import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return(
      <h1>Hello there</h1>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

console.log('hello world');
