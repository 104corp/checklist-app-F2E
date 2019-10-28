import React from 'react';
import '../css/App.css';
import Checklist from '../components/Checklist.js';
import Navbar from '../components/Navbar.js';
import { Route } from 'react-router-dom';

function App() {
  return (

      <React.Fragment className="App">
        <header>
          <Navbar></Navbar>
        </header>

        <div>
          {/* 初始進入頁面 */}
          <Route path="/" exact component={Checklist} />
         </div>

      </React.Fragment>


  );
}

export default App;
