import React, { Component } from 'react';
import Header from './views/header/header';
import Aside from './views/aside/aside'
import GetRouter from './router/router';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header></Header>
        <div className="bodyContainer">
          <Aside></Aside>
          <div className="asideContainer">
            <GetRouter/>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}

export default App;
