import React, { Component } from 'react';
import Background from './Background'
import Form from './Form'

class Login extends Component {
  render() {
    return(
      <div>
        <Background/>
        <Form/>
      </div>
    );
  }
}

export default Login;