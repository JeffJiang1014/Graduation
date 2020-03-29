import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import Axios from 'axios'
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrangeDuty from './arrangeDuty'
//import classNames from 'classnames'

const style = {
  root: {
    height: '300px',
    padding: '20px',
    marginTop: '80px',
    backgroundColor: '#bdbdbd',
  },
  content: {
    height: '80%',
    paddingTop: '30px',
    paddingLeft: '10px',
    fontSize: 14,
  },
  paper: {
    textAlign: 'left',
    fontSize:'25px',
    color:'white',
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    padding: '10px',
  },
  title: {
    fontSize: 40,
    marginBottom: '30px'
  },
  today: {
    height: '300px',
    padding: '20px',
    marginTop: '80px',
    backgroundColor: '#9fa8da',
  }
};

class Duty extends Component {
  constructor(props){
    super(props);
    this.state = {
      names: [],
      week: ['星期一','星期二','星期三','星期四','星期五','休息日'],
      weekInEnglish: ['Monday','Tuesday','Wednesday','Thursday','Friday','restDay'],
      allNames: [],
      flag: true,
    }
  }
  UNSAFE_componentWillMount(){
    const getNames = [];
    Axios.post("http://localhost:5000/api/duty/getDuty")
      .then(res => { 
        // this.setState({names:[]});
        for(var i in res.data){
          getNames.push(res.data[i].name);
          this.state.names.push(res.data[i].name) 
        }
        this.setState({names: getNames});
      })
      .catch(err => console.log(err.data))
  }

  // refresh(){
  //   //console.log(1)
  //   // Axios.delete("http://localhost:5000/api/duty/delete")
  //   // .then(res => { console.log(res.data) })
  //   // .catch(err => console.log(err.data))

  //   // Axios.post("http://localhost:5000/api/duty/insert")
  //   // .then(res => { console.log(res.data) })
  //   // .catch(err => console.log(err.data))
  // }

  edit(){
    if(this.state.flag){
      Axios.post("http://localhost:5000/api/duty/getAllNames")
        .then(res => {
          for(var i in res.data)
            this.state.allNames.push(res.data[i].name) 
        })
        .catch(err => console.log(err.data));
        this.setState({flag: false});
    }
  }
  
  setNames(data){
    //console.log(this);
    //console.log(data);
    this.setState({names: data});
    //console.log(this.state.names);
  }

  render(){
    // console.log(this.props.history.location.state.permission)
    //console.log(this.state.names)
    const { classes } = this.props;
    const permission = this.props.history.location.state.permission;
    let today = moment().format('dddd');
    //console.log(today);
    //console.log(this.state.weekInEnglish.includes(today) );
    if(this.state.weekInEnglish.includes(today)){
      today = moment().format('dddd');
    }else{
      today = 'restDay';
    }
    //console.log(today)
    //console.log(permission)
    //console.log(moment().format('dddd'))
    //console.log(style)
    //console.log(this.state.allNames);
    return (
      <div>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>本周值日安排</Paper>
        </Grid>
        {
          this.state.names.map((name,index) =>{
            if(today === this.state.weekInEnglish[index]){
            return(
              <Grid item xs={2} key={index}>
                <Card className={classes.today}>
                <CardContent className={classes.content}>
                    <h1 className={classes.title}>{this.state.week[index]}</h1>
                    <Divider />
                    <h3 style={{marginTop: '45%'}}>{name}</h3>
                </CardContent>
                {/* <Divider />
                { permission && permission !=='5' &&
                  <CardActions>
                     <Button size="medium" ariant="contained" color="primary" onClick={(e)=>{this.onClick(e)}} day={this.state.week[index]}>重新修改</Button>
                  </CardActions>
                } */}
                </Card>
              </Grid>
            )
            }
            else{
              return(
              <Grid item xs={2} key={index}>
                <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <h1 className={classes.title}>{this.state.week[index]}</h1>
                    <Divider />
                    <h3 style={{marginTop: '45%',marginLeft: '5px'}}>{name}</h3>
                </CardContent>
                {/* <Divider />
                { permission && permission !=='5' &&
                  <CardActions>
                     <Button size="medium" ariant="contained" color="primary" onClick={(e)=>{this.onClick(e)}} day={this.state.week[index]}>重新修改</Button>
                  </CardActions>
                } */}
                </Card>
              </Grid>
            )
            }
          }) 
        }
        </Grid>
        { permission !=='5' && (<ArrangeDuty names={this.state.names} week={this.state.week} onClick={this.edit()} allNames={this.state.allNames} update={this.setNames.bind(this)}/>)}
      </div>
    )
  }
}

export default withStyles(style)(Duty);