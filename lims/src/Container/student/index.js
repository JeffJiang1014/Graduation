import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Drawer from '../component/drawer'
import Axios from 'axios';

class Index extends Component{
    //id = this.props.location.state.id;

    constructor(){
        super();
        this.state = {
            id: '',
            name: '',
            permission: ''
        }
    }

    UNSAFE_componentWillMount(){
        Axios.post("http://localhost:5000/api/stuInfo/getStuInfo",{id: this.props.location.state.id})
        .then(res => {
            this.setState({
                id: res.data[0].id,
                name: res.data[0].name,
                permission: this.props.location.state.permission
            })
        })
        .catch(err => console.log(err.data))
    }
    render(){
        return(
            <div>
                <Drawer id={this.state.id} name={this.state.name} permission={this.state.permission}/>
            </div>
        )
    };
}

export default Index;