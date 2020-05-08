import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import SeatIcon from '@material-ui/icons/Weekend'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Axios from 'axios'
import classnames from 'classnames'
import { Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import $ from 'jquery'
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
  },
  tag: {
    textAlign: 'center',
  },
  hover: {
      marginBottom: '10px'
  },
  button: {
    width: '65%',
    margin: '40px auto',
    textAlign: 'center',
    fontSize: '20px',
    padding: '10px',
    border: 'double'
  },
  grid: {
    marginTop: '20px'
  },
  empty: {
    color: 'lightgrey',
  },
  editable:{
    color: 'lightgrey',
    cursor: 'pointer',
  },
  mine: {
    color: '#e91e63'
  },
  edit: {
    position: 'absolute',
    bottom: '90px',
    right: '200px',
  },
  occupation: {
    color: 'black'
  },
  sample: {
    float: 'right',
    marginRight: '250px',
    cursor: 'none'
  },
  modal: {
    height: '230px'
  },
  helper: {
    color: 'red'
  }
}

class NestedGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: sessionStorage.getItem('id'),
      allID: [],
      names: [],
      seat: 0,
      students: [],
      flag: false,
      edit: {},
      check: false,
    }
    //console.log(this.state.id)
  }

  disappear(){
    setTimeout(() => {
        $('#editModal').modal('hide');
        this.setState({flag: false});
    },1500)
  }

  UNSAFE_componentWillMount(){
    const getNames = [];
    const getIDs = [];
    Axios.post("http://localhost:5000/api/seat/getSeat")
      .then(res => { 
        for(var i in res.data){
          getIDs.push(res.data[i].id)
          getNames.push(res.data[i].name)
        }
         this.setState({names: getNames});
         this.setState({allID: getIDs})
        // console.log(this.state.seats[1].id);
      })
      .catch(err => console.log(err.data))
    Axios.post("http://localhost:5000/api/seat/getStudents")
      .then(res => {
        for(var i in res.data)
          this.state.students.push(res.data[i]) 
      })
      .catch(err => console.log(err.data));
  }

  onClick(){
    this.setState({flag: true, check: false});
    const newSeat = {
      seat: Number(this.state.seat) + 1,
      id: this.state.edit.id,
      name: this.state.edit.name
    }
    //console.log(newSeat);
    var promise = new Promise((resolve) => {
      console.log(1);
      //console.log(this.state.edit.id)
      Axios.post('http://localhost:5000/api/seat/delete', {id: this.state.edit.id})
      .then(res => {console.log("delete success")})
      .catch(err => {console.log(err.data)});
      resolve();
      return promise;
    })
    promise.then(() => {
      console.log(2)
      Axios.post('http://localhost:5000/api/seat/update', newSeat)
      .then(res => {
        const newNames = this.state.names;
        const newID = this.state.allID;
        for(var i in newID){
          if(newSeat.id === newID[i]){
            newID[i] = "";
            newNames[i] = ""
          }
        }
        newNames[this.state.seat] = newSeat.name;
        newID[this.state.seat] = newSeat.id;
        this.setState({allID: newID, names: newNames})
        console.log("update success")
      })
      .catch(err => {console.log(err.data)});
    })      
    this.disappear();
}

  edit(e){
    this.setState({seat: e.currentTarget.parentNode.getAttribute('value')});
  }

  onChange(editId,editName){
    // console.log(name)
    // console.log(id);
    var newEdit = {id: editId, name: editName};
    this.setState({edit: newEdit});
  }


render(){
  //console.log(this.state.students)
  //console.log(this.state.seats[1]);
  //console.log(JSON.stringify(this.state.edit) == "{}")
  const { classes } = this.props;
  const rows = [0,1,2];
  const cols = [0,1,2,3];
  return (
    <div className={classes.root}>
    <div className={classes.button}>讲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台</div>
    <div className={classes.sample}>
     <Button
        startIcon={<SeatIcon></SeatIcon>}
        className={classes.empty}
      >
        空闲
      </Button>
      <Button
        startIcon={<SeatIcon></SeatIcon>}
        className={classes.occupation}
      >
        已占用
      </Button>`
    </div>
      <Grid container spacing={6} className={classes.grid}>
      {
        rows.map((row,i) => {
          return(
            <Grid container item xs={12} key={i}>
              {
                cols.map((col,j) => {
                return(
                  <Grid item xs={3} key={j}>
                  {this.state.names[row*4+col] && this.state.allID[row*4+col]!==this.state.id &&
                    (<div className={classes.paper}><SeatIcon fontSize='large' className={classes.hover}/>
                      <div>{this.state.names[row*4+col]}</div>
                    </div>)
                  }
                  {this.state.names[row*4+col] && this.state.allID[row*4+col]===this.state.id &&
                    (<div className={classes.paper}><SeatIcon fontSize='large' className={classnames(classes.hover,classes.mine)}/>
                      <div className={classes.mine}>我的座位</div>
                    </div>)
                  }
                  {(this.state.names[row*4+col]===null || this.state.names[row*4+col]==='') && 
                    (<div className={classes.paper} value={row*4+col}>
                      {sessionStorage.getItem('permission')==='2' && (
                        <SeatIcon 
                        fontSize='large' 
                        className={classes.editable} 
                        onClick={(e) => this.edit(e)}
                        data-toggle="modal" 
                        data-target="#editModal"
                        />
                        )
                      }
                      {sessionStorage.getItem('permission')!=='2' && (
                        <SeatIcon 
                        fontSize='large' 
                        className={classes.empty}
                        />
                        )
                      }
                      <div>{this.state.names[row*4+col]}</div>
                    </div>)
                  }
                    {/* <div className={classes.tag}>{this.state.seats[i*4+j+1]}</div> */}
                    {/* { this.state.seats[0] && console.log(this.state.seats)} */}
                  </Grid>
                )
              })
              }
            </Grid>
          )
        })
      }       
      </Grid>
      
      <div className="modal fade" id="editModal" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">将 {Number(this.state.seat)+1} 号座位分配给</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className={classnames("modal-body",classes.modal)}>
                    <form>
                    <RadioGroup aria-label="names">
                      {
                        this.state.students.map((item,index) => {
                          return(
                            <FormControlLabel value={item.id} control={<Radio />} label={item.name} key={index} onChange={(e) => this.onChange(item.id,item.name)}/>
                          )
                        })
                      }                     
                    </RadioGroup>
                    </form>
                </div>
                { this.state.flag && <LinearProgress />}
                <div className="modal-footer">
                    {this.state.check && <FormHelperText className={classes.helper}>请选择一个选项</FormHelperText>}
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" className="btn btn-primary"  onClick={()=>{JSON.stringify(this.state.edit) === "{}"?this.setState({check: true}):this.onClick()}}>保存</button>
                </div>
                </div>
            </div>
            </div>

      {/* {sessionStorage.getItem('permission')==='3' && (<Button variant="contained" color="primary" className={classes.edit}>排列座位</Button>)}
      {sessionStorage.getItem('permission')==='2' && (<Button variant="contained" color="primary" className={classes.edit}>分配座位</Button>)} */}
    </div>
  );
}
}

export default withStyles(useStyles)(NestedGrid);