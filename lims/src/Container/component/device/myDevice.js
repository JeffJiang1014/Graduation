import React, { Component } from 'react';
import { withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import Axios from 'axios'
import Grid from '@material-ui/core/Grid';
import moment from 'moment'
import bg from '../../../img/device.jpg'
import { Button } from '@material-ui/core';


const style = ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: blue[700],
  },
  manage: {
    marginBottom: '5px'
  },
  button: {
    float:'right',
    marginBottom: '10px',
  }
});

class MyDevice extends Component {
    constructor(props){
        super(props);
        this.state = {
          devices: [],
        }
    }

    UNSAFE_componentWillMount(){
        Axios.post("http://localhost:5000/api/equipment/myEquipment", {id: sessionStorage.getItem('id')})
        .then(res => {
          this.setState({devices: res.data})
        })
        .catch(err => {console.log(err.data)})
    }

    onClick(e){
      //console.log(e.target.parentNode.value)
      var newDevice = [];
      const time = moment().format("YYYY-MM-DD HH:mm:ss");
      const number = e.target.parentNode.value;
      Axios.post("http://localhost:5000/api/equipment/return", {id: sessionStorage.getItem('id'), number: number, time: time})
        .then(res => {
          for(var i in this.state.devices){
            if(this.state.devices[i].number !== number){
              newDevice.push(this.state.devices[i]);
            }
          }
          //console.log(newDevice);
        })
        .catch(err => {console.log(err.data)})
        setTimeout(() => {
          this.setState({devices: newDevice});
        },1500)
    }
    render(){
      //console.log(this.state.devices);
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
              {
                this.state.devices.map((item,index) => {
                  return(
                    <Grid item xs={3} key={index}>
                    <Card className={classes.root}>
                      <CardHeader
                          avatar={
                          <Avatar aria-label="recipe" className={classes.avatar}>
                              {item.number}
                          </Avatar>
                          }
                          title={item.name}
                          subheader={"领用日期："+moment(item.start_time).format('YYYY-MM-DD')}
                      />
                      <CardMedia
                          className={classes.media}
                          image={bg}
                          title={"设备型号："+item.type}
                      />
                      <CardContent>
                          <p className={classes.manage}>管理员：{item.manager_name}</p>
                          <p className={classes.manage}>联系电话：{item.phone}</p>
                          <Button color="secondary" className={classes.button} onClick={(e) => this.onClick(e)} value={item.number}>归还</Button>
                      </CardContent>
                    </Card>
                    </Grid>
                  )
                })
              }
            </Grid>
        );
    }
}
    

export default withStyles(style)(MyDevice);