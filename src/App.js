import React, { Component } from 'react';
import './css/App.css';
import Checklist from './components/Checklist.js';
import { Route } from 'react-router-dom';

class App extends Component {
  

  render(){

    return (
        <div className="App">
          <div>
            {/* 初始進入頁面 */}
            <Route path="/" exact component={Checklist} />
          </div>
        </div>
    )
  }
}

export default App;
