import React , { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';  
import 'jquery'
import { withRouter } from 'react-router-dom'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock'
import InputAdornment from '@material-ui/core/InputAdornment';

const style = ({
    login: {
      width: '100%',
    }
})

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
    this.setState({ [e.target.name]: e.target.value , errors: {}});
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      id: this.state.id,
      password: this.state.password
    };
    Axios.post("http://localhost:5000/api/user/login",newUser)
    .then(res => {
      //console.log(res.data.permission);
      window.sessionStorage.setItem('permission',res.data.permission);
      window.sessionStorage.setItem('id',this.state.id);
      switch (res.data.permission) {
        case "1":
          this.props.history.push('/manager');
          break;
        default:
          this.props.history.push('/user_index');
          break;
      }
    })
    .catch(err => this.setState({errors: err.response.data}))
  }
  render(){
    const errors = this.state.errors;
    //console.log(errors)
    const classes = this.props;
    return (
      <div>
        <Grid container style={{"marginTop": "150px"}}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} style={{"backgroundColor": "rgba(255,255,255,0.5)", "height":"430px", "padding": "40px"}}>
          <div className={classes.login} style={{"textAlign": "center","fontSize":"40px","fontWeight":"bold", "fontFamily": "楷体","color": "darkblack","margin": "10px 0px 30px 0px"}}>研究所日常管理系统</div>
            <form onSubmit={this.onSubmit} method="post">
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
                onChange={(e) => this.onChange(e)}
                InputProps={{endAdornment: <InputAdornment position="end"><AccountCircle/></InputAdornment>,}}
              />
              {
                errors.id && (<div className="invlid-feedback" style={{"textAlign": "left", "color": "red"}}><ErrorIcon fontSize="small"/>{errors.id}</div>)
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
                onChange={(e) => this.onChange(e)}
                InputProps={{endAdornment: <InputAdornment position="end"><Lock/></InputAdornment>,}}
              />
               {
                errors.password && (<div className="invlid-feedback" style={{"text-align": "left", "color": "red"}}><ErrorIcon fontSize="small"/>{errors.password}</div>)
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{"marginTop": "30px"}}
              >
                登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
  
}

export default withRouter(withStyles(style)(Form));