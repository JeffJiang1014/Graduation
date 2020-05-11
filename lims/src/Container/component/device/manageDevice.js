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
import classnames from 'classnames'


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
  },
  offline: {
      color: 'red'
  },
  online: {
      color: 'green'
  },
  occupy: {
      color: 'blue'
  },
  card: {
    height: '150px'
  }
});

class ManageDevice extends Component {
    constructor(props){
        super(props);
        this.state = {
          devices: [],
        }
    }

    UNSAFE_componentWillMount(){
        Axios.post("http://localhost:5000/api/equipment/getEquipment")
        .then(res => {
          this.setState({devices: res.data})
        })
        .catch(err => {console.log(err.data)})
    }

    online(e){
      //console.log(e.target.parentNode.value)
      const number = e.target.parentNode.value;
      var onDevice = [];
      Axios.post("http://localhost:5000/api/equipment/online",{number: number})
        .then(res => {console.log(2)
          for(var i in this.state.devices){
            if(this.state.devices[i].number !== number){
              onDevice.push(this.state.devices[i]);
            }
            else{
              var temp = this.state.devices[i];
              temp.status = 0;
              console.log(temp)
              onDevice.push(temp);
            }
          }
          this.setState({devices: onDevice})
        })
        .catch(err => {console.log(err.data)})
        console.log(onDevice);
        //this.setState({devices: onDevice})
    }

    offline(e){
      //console.log(e.target.parentNode.value)
      const number = e.target.parentNode.value;
      var offDevice = [];
      Axios.post("http://localhost:5000/api/equipment/offline",{number: number})
        .then(res => {console.log(1)
          for(var i in this.state.devices){
            //console.log(1)
            if(this.state.devices[i].number !== number){
              offDevice.push(this.state.devices[i]);
            }
            else{
              var temp = this.state.devices[i];
              temp.status = -1;
              console.log(temp)
              offDevice.push(temp);
            }
          }
          this.setState({devices: offDevice})
        })
        .catch(err => {console.log(err.data)})
        console.log(offDevice);
        //this.setState({devices: offDevice})
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
                          subheader={"录入日期："+moment(item.create_time).format('YYYY-MM-DD')}
                      />
                      <CardMedia
                          className={classes.media}
                          image={bg}
                          title={"设备型号："+item.type}
                      />
                      <CardContent className={classes.card}>
                          <p className={classes.manage}>管理员：{item.manager_name}</p>
                          <p className={classes.manage}>联系电话：{item.phone}</p>
                          {
                              item.status === -1 && (<p className={classes.manage}>设备状态：<span className={classes.offline}>下线</span></p>)
                          }
                          {
                              item.status === 0 && (<p className={classes.manage}>设备状态：<span className={classes.online}>可申领</span></p>)
                          }
                          {
                              item.status === 1 && (<p className={classes.manage}>设备状态：<span className={classes.occupy}>已申领</span></p>)
                          }
                          {
                            (item.manager_id === sessionStorage.getItem('id') && item.status === -1) && (<Button className={classnames(classes.button,classes.occupy)} onClick={(e) => this.online(e)} value={item.number}>上线</Button>)
                          }
                          {
                            (item.manager_id === sessionStorage.getItem('id') && item.status === 0) && (<Button className={classnames(classes.button,classes.offline)} onClick={(e) => this.offline(e)} value={item.number}>下线</Button>)
                          }
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
    

export default withStyles(style)(ManageDevice);