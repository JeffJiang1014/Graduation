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
import $ from 'jquery'
import TextField from '@material-ui/core/TextField';
import Success from '../success'


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
  },
  input: {
    padding: '14px',
    margin: '20px 0px'
  }
});

class AllDevice extends Component {
    constructor(props){
        super(props);
        this.state = {
          devices: [],
          request: -1,
          info: [],
          usage: '',
          date: moment().format("YYYY-MM-DD"),
          flag: false,
          manager_id: '',
          success: false
        }
    }

    UNSAFE_componentWillMount(){
        Axios.post("http://localhost:5000/api/equipment/getEquipment")
        .then(res => {
          this.setState({devices: res.data})
        })
        .catch(err => {console.log(err.data)})
    }

    onClick(e){
      //console.log(e.target.parentNode.value)
      Axios.post("http://localhost:5000/api/getInfo/getSomeStuInfo",{id: sessionStorage.getItem('id')})
      .then(res => {
        this.setState({
            info: res.data[0],
        })
        //console.log(this.state.info)
      })
      .catch(err => console.log(err.data))
      this.setState({request: e.target.parentNode.value, manager_id: e.target.parentNode.parentNode.getAttribute('value')});
      //console.log(e.target.parentNode.parentNode.getAttribute('value'))
      $('#editModal').modal('show');      
    }

    submit(e){
      if(this.state.usage === ''){
        this.setState({flag: true})
      }
      else{
        Axios.post("http://localhost:5000/api/equipment/application",{info: this.state.info, usage: this.state.usage, date: this.state.date, number: this.state.request, manager_id: this.state.manager_id})
        .then(res => {
          $('#editModal').modal('hide');
          this.setState({success: true});
        })
        .catch(err => console.log(err.data))
      }
    }

    render(){
      //console.log(this.state.devices);
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
            {this.state.success && (<Success/>)}
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
                              item.status === 0 && (<div  value={item.manager_id}>
                              <p className={classes.manage}>设备状态：<span className={classes.online}>可申领</span></p>
                              <Button color="primary" className={classes.button} onClick={(e) => {this.onClick(e)}} value={[item.number]}>申领</Button>
                              </div>)
                          }
                          {
                              item.status === 1 && (<p className={classes.manage}>设备状态：<span className={classes.occupy}>已领用</span></p>)
                          }
                      </CardContent>
                    </Card>
                    </Grid>
                  )
                })
              }
              <div className="modal fade" id="editModal" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" data-backdrop="static">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">申领 {this.state.request} 号设备</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                        <Grid container spacing={2} alignItems="flex-end">
                          <Grid item xs={12}>
                            申领人个人信息
                          </Grid>
                          <Grid item xs={3}>
                            学号：
                          </Grid>
                          <Grid item xs={9}>
                            {this.state.info.id}
                          </Grid>
                          <Grid item xs={3}>
                            姓名：
                          </Grid>
                          <Grid item xs={9}>
                            {this.state.info.name}
                          </Grid>
                          <Grid item xs={3}>
                            学历：
                          </Grid>
                          <Grid item xs={9}>
                            {this.state.info.graduated}
                          </Grid>
                          <Grid item xs={3}>
                            联系电话：
                          </Grid>
                          <Grid item xs={9}>
                            {this.state.info.phone}
                          </Grid>
                          <Grid item xs={3}>
                            学院：
                          </Grid>
                          <Grid item xs={9}>
                            {this.state.info.college}
                          </Grid>
                          <Grid item xs={3}>
                            专业：
                          </Grid>
                          <Grid item xs={9}>
                            {this.state.info.major}
                          </Grid>
                          <Grid item xs={3}>
                            班级：
                          </Grid>
                          <Grid item xs={9}>
                            {this.state.info.class}
                          </Grid>
                          <Grid item xs={3} className={classes.input}>
                            用途：
                          </Grid>
                          <Grid item xs={9}>
                            {this.state.flag?<TextField fullWidth error helperText="请填写申领用途" variant="outlined" onChange={(e) => this.setState({usage: e.target.value, flag: false})}></TextField>:
                            <TextField fullWidth variant="outlined" onChange={(e) => this.setState({usage: e.target.value})}></TextField>}
                          </Grid>
                          <Grid item xs={3} className={classes.input}>
                            领用日期：
                          </Grid>
                          <Grid item xs={9}>
                            <TextField fullWidth variant="outlined" type="date" defaultValue={moment().format("YYYY-MM-DD")} onChange={(e) => this.setState({date: e.target.value})}></TextField>
                          </Grid>
                        </Grid>
                        </form>
                    </div>
                    {/* { this.state.flag && <LinearProgress />} */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => this.submit(e)}>提交</button>
                    </div>
                    </div>
                </div>
            </div>
            </Grid>
        );
    }
}
    

export default withStyles(style)(AllDevice);