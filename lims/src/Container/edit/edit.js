import React, { Component } from 'react';
import Form from './form'
import Bar from '../component/appBar'

class Login extends Component {
  render() {
    return(
      <div>
        <div className='ro'>
            <div className= "dark-overlay">
            <Form/>
            </div>
          </div>
          <Bar isEdit={true}/>
      </div>
    );
  }
}

export default Login;