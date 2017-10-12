import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import Homepage from './Homepage.js';


class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <Homepage />
       
      </div>
    );
  }
}

export default App;
