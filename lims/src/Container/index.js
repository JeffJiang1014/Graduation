import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Container from './component/container'

class Index extends Component{
    //id = this.props.location.state.id;
    render(){
        //console.log(this.state.info)
        return(
            <div>
                <Container/>
            </div>
        )
    };
}

export default Index;