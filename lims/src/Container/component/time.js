import React from 'react';
import { Component } from 'react';
import moment from 'moment'

class Time extends Component{
    constructor(){
        super();
        this.state = {
            timer: null,
            dater: null,
            date: '',
            time: '',
        }
    }
    getDate(){
        this.setState({date : moment().format("YYYY-MM-DD")});
    }
    getTime(){
        this.setState({time : moment().format("hh:mm:ssA")});
    }
    componentDidMount(){
        this.setState({timer:setInterval(()=>{

            this.getTime()
            
            }, 1000)})
        this.setState({dater:setInterval(()=>{

            this.getDate()
            
            }, 1000*60*60*24)})

    }
    UNSAFE_componentWillMount(){
        this.getDate();
        this.getTime();
        this.setState = (state,callback)=>{
            return;
          };
    }
    render(){
        return(
        <div style={{"color":"rgba(0, 0, 0, 0.26)","margin":"250px 30%"}}>
            <h2>现在是&nbsp;&nbsp;{this.state.date}&nbsp;&nbsp;{this.state.time}</h2>
        </div>
        )
    }
}

export default Time;