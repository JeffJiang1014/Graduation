import React, { Component } from 'react';
import Bar from '../component/appBar'
import Research from './showRearch'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Success from '../component/success'


class Index extends Component {
    constructor(props){
      super(props);
      this.state = {
        msg: sessionStorage.getItem('success'),
      }
      //console.log(this.props.location)
    }
    render(){
        return (
          <div className='ro'>
            <div className= "dark-overlay">
            <Success open={this.state.msg}/>
            <Bar/>
            <Research/>
            <Button
            component={Link}
            to='/add'
            variant="contained"
            size="large"
            style={{"width": "100%", "height": "50px", "color":"black", "fontWeight": "bold" ,"backgroundColor":"#e0e0e0","borderRadius":"0"}}
            >
              加&nbsp;入&nbsp;我&nbsp;们
            </Button>
            </div>
          </div>
          );
    }
}

export default Index;