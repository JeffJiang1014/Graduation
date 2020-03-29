import React, { Component } from 'react';
import './index.css';
import bg from '../../../img/bg1.jpg'

class Background extends Component{
    render(){
        return(
             <img src={bg} alt={bg}/>
        )
    };
}

export default Background;