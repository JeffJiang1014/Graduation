import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { withRouter } from 'react-router-dom'

class Index extends Component{

    render(){
        return(
            <div>管理员{this.props.location.state.id}hello</div>
        )
    };
}

export default withRouter(Index);