import React from 'react';
import Login from './Container/Login/login';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Manager_index from './Container/manager/index';
import user_index from './Container/index';
import Index from './Container/index/index';
import Add from './Container/joinus/add'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Index}/>
        <Route exact path="/add" component={Add}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/manager" component={Manager_index}/>
        <Route exact path="/user_index" component={user_index}/>
      </div>
    </Router>
  );
}

export default App;
