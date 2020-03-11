import React from 'react';
import Login from './Container/Login/login';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Manager_index from './Container/manager/index';
import Student_index from './Container/student/index';
import Teacher_index from './Container/teacher/index';
import Monitor_index from './Container/monitor/index';
import Headteacher_index from './Container/headteacher/index';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login}/>
        <Route exact path="/manager_index" component={Manager_index}/>
        <Route exact path="/teacher_index" component={Teacher_index}/>
        <Route exact path="/student_index" component={Student_index}/>
        <Route exact path="/monitor_index" component={Monitor_index}/>
        <Route exact path="/headteacher_index" component={Headteacher_index}/>
      </div>
    </Router>
  );
}

export default App;
