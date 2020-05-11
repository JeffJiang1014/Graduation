import React , { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';  
import 'jquery'
import { withRouter } from 'react-router-dom'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';

const style = ({
    login: {
      width: '100%',
    },
    margin: {
        margin: '20px',
      },
      textField: {
        width: '25ch',
      },
})

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: sessionStorage.getItem('id'),
      password: '',
      repeat: '',
      errors: false,
      showPassword1: false,
      showPassword2: false,
      submit: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClickShowPassword1(e){
      this.setState({showPassword1: !this.state.showPassword1})
  }
  handleClickShowPassword2(e){
    this.setState({showPassword2: !this.state.showPassword2})
}

//   handleMouseDownPassword(e){
//     e.preventDefault();
//   }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value , errors: false});
  }

  onSubmit(e) {
    if(this.state.password !== this.state.repeat){
        this.setState({errors: true})
        return false;
    }else{
    e.preventDefault();
    const newUser = {
      id: this.state.id,
      password: this.state.password
    };
    Axios.post("http://localhost:5000/api/user/edit",newUser)
    .then(res => {
        this.setState({submit: true});
    })
    .catch(err => this.setState({errors: err.response.data}))
    setInterval(() => {
        sessionStorage.clear();
        window.location.href = "/";
    },2000)
  }
}
  render(){
    const errors = this.state.errors;
    //console.log(errors)
    const classes = this.props;
    return (
      <div>
        <Grid container style={{"marginTop": "150px"}}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} style={{"backgroundColor": "rgba(255,255,255,0.5)", "height":"400px", "padding": "40px"}}>
          <div className={classes.login} style={{"textAlign": "center","fontSize":"30px", "color": "darkblack","margin": "10px 0px"}}>重&nbsp;置&nbsp;密&nbsp;码</div>
            <form>
                <FormControl variant="outlined" required fullWidth style={{"marginTop":"20px"}}>
                <InputLabel htmlFor="outlined-adornment-password">新密码</InputLabel>
                <OutlinedInput
                    id="showPassword1"
                    type={this.state.showPassword1 ? 'text' : 'password'}
                    name="password"
                    onChange={(e) => this.onChange(e)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) => this.handleClickShowPassword1(e)}
                        edge="end"
                        >
                        {this.state.showPassword1 ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={70}
                />
                </FormControl>

                <FormControl variant="outlined" required fullWidth style={{"marginTop":"40px"}}>
                <InputLabel htmlFor="outlined-adornment-password">再次输入</InputLabel>
                <OutlinedInput
                    id="showPassword2"
                    type={this.state.showPassword2 ? 'text' : 'password'}
                    name="repeat"
                    onChange={(e) => this.onChange(e)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) => this.handleClickShowPassword2(e)}
                        edge="end"
                        >
                        {this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={70}
                />
                </FormControl>
               {
                errors && (<div className="invlid-feedback" style={{"text-align": "left", "color": "red"}}><ErrorIcon fontSize="small"/>密码不一致</div>)
              }
              <Button
                onClick={(e) => this.onSubmit(e)}
                fullWidth
                variant="contained"
                color="primary"
                style={{"marginTop": "30px"}}
              >
                提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交
              </Button>
            </form>
          </Grid>
        </Grid>
        {this.state.submit && (<LinearProgress style={{"width":"33.333%","marginLeft":"33.3333%"}}/>)}
      </div>
    );
  }
  
}

export default withRouter(withStyles(style)(Form));