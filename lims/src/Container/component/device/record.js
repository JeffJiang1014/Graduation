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
      devices: []
    }
  }

    UNSAFE_componentWillMount(){
      if(sessionStorage.getItem('permission') === '4' || sessionStorage.getItem('permission') === '5')
        Axios.post("http://localhost:5000/api/equipment/record", {id: sessionStorage.getItem('id')})
        .then(res => {
          this.setState({devices: res.data})
        })
        .catch(err => {console.log(err.data)})
      else{
        Axios.post("http://localhost:5000/api/equipment/allrecord", {id: sessionStorage.getItem('id')})
        .then(res => {
          this.setState({devices: res.data})
        })
        .catch(err => {console.log(err.data)})
      }
  }

  render(){
    console.log(this.state.devices)
    const { classes } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>设备编号</StyledTableCell>
              <StyledTableCell align="center">设备型号</StyledTableCell>
              <StyledTableCell align="center">设备名称</StyledTableCell>
              <StyledTableCell align="center">管理员</StyledTableCell>
              <StyledTableCell align="center">领用日期</StyledTableCell>
              <StyledTableCell align="center">归还日期</StyledTableCell>
              {(sessionStorage.getItem('permission') === '2' || sessionStorage.getItem('permission') === '3') && (
                <StyledTableCell align="center">领用人</StyledTableCell>
                )}
                {(sessionStorage.getItem('permission') === '2' || sessionStorage.getItem('permission') === '3') && (
                <StyledTableCell align="center">联系方式</StyledTableCell>
                )}
              <StyledTableCell align="center">用途</StyledTableCell>
              <StyledTableCell align="center">设备领用状态</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.devices.map((row,index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" >
                  {row.number}
                </TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.manager_name}</TableCell>
                <TableCell align="center">{moment(row.start_time).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="center">{row.end_time?moment(row.end_time).format('YYYY-MM-DD'):row.end_time}</TableCell>
                {(sessionStorage.getItem('permission') === '2' || sessionStorage.getItem('permission') === '3') && (
                  <TableCell align="center">{row.owner_name}</TableCell>
                )}
                {(sessionStorage.getItem('permission') === '2' || sessionStorage.getItem('permission') === '3') && (
                  <TableCell align="center">{row.owner_phone}</TableCell>
                )}
                <TableCell align="center">{row.for_usage}</TableCell>
                {row.status === 0 ? (<TableCell align="center" className={classes.status0}>未归还</TableCell>):(<TableCell align="center" className={classes.status1}>已归还</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(style)(Record);