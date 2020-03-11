import React , { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './index.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'jquery'
import { withRouter } from 'react-router-dom'

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      password: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    //console.log({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      id: this.state.id,
      password: this.state.password
    };
    Axios.post("http://localhost:5000/api/user/login",newUser)
    .then(res => {
      console.log(res.data.permission);
      switch (res.data.permission) {
        case "1":
          this.props.history.push({pathname:'/manager_index', state:{id:this.state.id}});
          break;
        case "2":
          this.props.history.push('/headteacher_index',{id:this.state.id});
          break;
        case "3":
          this.props.history.push('/teacher_index',{id:this.state.id});
          break;
        case "4":
          this.props.history.push('/monitor_index',{id:this.state.id});
          break;
        case "5":
          this.props.history.push('/student_index',{id:this.state.id});
          break;
        default:
          break;
      }
    })
    .catch(err => this.setState({errors: err.response.data}))
  }
  render(){
    const { errors } = this.state;
    //console.log(errors);
    // if(!isEmpty(errors)){
    //   if("id" in errors){
    //     $(".modal-body").html(errors.id);
    //     $("#modalCenter").modal("show");
    //     this.setState({errors: {}});
    //   }
    //   if("password" in errors){
    //     $(".modal-body").html(errors.password);
    //     $("#modalCenter").modal("show");
    //     this.setState({errors: {}});
    //   }
    // }
    return (
      <div className="ro">
        <h1 className="title">
          研究所日常管理系统
        </h1>
        <Grid component={Paper} elevation={6} className="main">
          <div className="paper">
            <form className="form" onSubmit={this.onSubmit} method="post">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="id"
                label="用户名"
                name="id"
                autoFocus
                value={this.state.id}
                onChange={this.onChange}
              />
              {
                errors.id && (<div className="invlid-feedback error">{errors.id}</div>)
              }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.onChange}
              />
               {
                errors.password && (<div className="invlid-feedback error">{errors.password}</div>)
              }
              <Grid container>
                  <Grid item sm={6} md={8}></Grid>
                  <Grid item sm={4} md={4}>
                      <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="记住我"
                      />
                      <Link href="#" variant="body2">
                          忘记密码
                      </Link>
                  </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
              </Button>
            </form>
          </div>
        </Grid>
      </div>
    );
  }
  
}

export default withRouter(Form);