import React, { Component } from 'react';
import Bar from '../component/appBar'
import { Grid } from '@material-ui/core';
import '../index/land.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';  
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom'


class Add extends Component {
  constructor(props){
    super(props);
    this.state = {
      tutors: [],
      name: '',
      id: '',
      skills: '',
      intro: '',
      phone: '',
      tutor: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillMount(){
    Axios.post("http://localhost:5000/api/getInfo/getSomeTeaInfo")
    .then(res => {
      this.setState({tutors: res.data});
    })
    .catch(err => {console.log(err.data)})
  }

  onChange(e) {
    if(e.target.name === 'tutor')
      this.state.tutor = e.target.value;
    else
    //console.log({ [e.target.name]: e.target.value });
      this.setState({ [e.target.name]: e.target.value});
    
    //console.log(this.state.tutor)
  }

  onSubmit(e){ 
    e.preventDefault();
    const application = {
      id: this.state.id,
      name: this.state.name,
      skills: this.state.skills,
      intro: this.state.intro,
      tutor: this.state.tutor,
      phone: this.state.phone
    }
    //console.log(application)
    Axios.post("http://localhost:5000/api/application/add",application)
    .then(res => {
      window.sessionStorage.setItem("success",true);
      this.props.history.push('/');
    })
    .catch(err => {console.log(err.data)})
  }

  render() {
    //console.log(this.state.tutor)
    return(
      <div>
        <div className='ro'>
            <div className= "dark-overlay">
                <Grid container style={{"marginTop": "120px"}}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} style={{"backgroundColor": "rgba(255,255,255,0.5)", "height":"560px", "padding": "40px"}}>
                        <div style={{"textAlign": "center","fontSize":"30px", "fontWeight": "bold","margin": "0px 0px 30px 0px"}}>加&nbsp;入&nbsp;我&nbsp;们</div>
                        <form onSubmit={this.onSubmit} method="post">
                        <TextField required label="学号" name="id" variant="outlined" fullWidth size="small" style={{"marginBottom": "20px"}} onChange={(e) => this.onChange(e)}/>
                        <TextField required label="姓名" name="name" variant="outlined" fullWidth size="small" style={{"marginBottom": "20px"}} onChange={(e) => this.onChange(e)}/>
                        <TextField required label="专业技能" name="skills" variant="outlined" fullWidth size="small" style={{"marginBottom": "20px"}} onChange={(e) => this.onChange(e)}/>
                        <TextField required label="自我简介" name="intro" variant="outlined" fullWidth size="small" style={{"marginBottom": "20px"}} onChange={(e) => this.onChange(e)}/>
                        <TextField required label="联系方式" name="phone" variant="outlined" fullWidth size="small" style={{"marginBottom": "20px"}} onChange={(e) => this.onChange(e)}/>
                        <TextField required label="意向导师" name="tutor" variant="outlined" fullWidth size="small" style={{"marginBottom": "20px","textAlign":"left"}} select onChange={(e) => this.onChange(e)}>
                          {this.state.tutors.map((item,index) => {
                            return(
                            <MenuItem key={index} value={item.id}>
                              {item.id}&nbsp;{item.name}
                            </MenuItem>)
                          })}
                        </TextField>
                        <Button
                        type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          style={{"marginTop": "10px"}}
                        >
                          提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交
                        </Button>
                        </form>
                        
                    </Grid>
                </Grid>
            </div>
          </div>
          <Bar/>
      </div>
    );
  }
}

export default withRouter(Add);