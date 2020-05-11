import React, { Component } from 'react';
import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios'
import moment from 'moment'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const style = ({
  table: {
    minWidth: 650,
  },
  status0: {
    color: "red"
  },
  status1: {
    color: "green"
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Record extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestInfo: []
    }
  }

    UNSAFE_componentWillMount(){
        Axios.post("http://localhost:5000/api/equipment/request", {id: sessionStorage.getItem('id')})
        .then(res => {
         // console.log(res.data)
          this.setState({requestInfo: res.data})
          //console.log(this.state.requestInfo)
        })
        .catch(err => {console.log(err.data)})
  }

  refuse(e){
    // console.log(e.target.parentNode.parentNode.getAttribute('id'))
    // console.log(e.target.parentNode.parentNode.getAttribute('number'))
    Axios.post("http://localhost:5000/api/equipment/refuse", {id: e.target.parentNode.parentNode.getAttribute('id'), number: e.target.parentNode.parentNode.getAttribute('number')})
        .then(res => {
         // console.log(res.data)
          this.UNSAFE_componentWillMount()
          //console.log(this.state.requestInfo)
        })
        .catch(err => {console.log(err.data)})
  }

  accept(e){
    Axios.post("http://localhost:5000/api/equipment/accept", {
      id: e.target.parentNode.parentNode.getAttribute('id'), 
      number: e.target.parentNode.parentNode.getAttribute('number'), 
      time: e.target.parentNode.parentNode.getAttribute('time'),
      phone: e.target.parentNode.parentNode.getAttribute('phone'),
      name: e.target.parentNode.parentNode.getAttribute('name'),
      usage: e.target.parentNode.parentNode.getAttribute('usage'),
    })
        .then(res => {
         // console.log(res.data)
          this.UNSAFE_componentWillMount()
          //console.log(this.state.requestInfo)
        })
        .catch(err => {console.log(err.data)})
  }

  render(){
    //console.log(this.state.devices)
    //console.log(this.state.requestInfo)
    const { classes } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>设备编号</StyledTableCell>
              <StyledTableCell align="center">申领人学号</StyledTableCell>
              <StyledTableCell align="center">申领人姓名</StyledTableCell>
              <StyledTableCell align="center">申领人学历</StyledTableCell>
              <StyledTableCell align="center">联系电话</StyledTableCell>
              <StyledTableCell align="center">申请提交时间</StyledTableCell>
              <StyledTableCell align="center">预计领用日期</StyledTableCell>
              <StyledTableCell align="center">用途</StyledTableCell>
              <StyledTableCell align="center">操作</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.requestInfo.map((row,index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" >
                  {row.number}
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.graduated}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{moment(row.submit_time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell align="center">{moment(row.start_time).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="center">{row.for_usage}</TableCell>
                {row.status === 0 && <TableCell align="center">
                <ButtonGroup variant="text" color="primary" id={row.id} number={row.number} time={moment(row.start_time).format('YYYY-MM-DD')} phone={row.phone} usage={row.for_usage} name={row.name}>
                  <Button onClick={(e) => this.accept(e)}>同意</Button>
                  <Button color="secondary" onClick={(e) => this.refuse(e)}>拒绝</Button>
                </ButtonGroup>
                  </TableCell>}

                  {row.status === -1 && <TableCell align="center" className={classes.status0}>
                    已拒绝
                  </TableCell>}

                  {row.status === 1 && <TableCell align="center" className={classes.status1}>
                    已同意
                  </TableCell>}
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(style)(Record);