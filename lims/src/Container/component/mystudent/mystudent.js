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

class MyStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      students: []
    }
  }

    UNSAFE_componentWillMount(){
        Axios.post("http://localhost:5000/api/getInfo/getMyStudent", {id: sessionStorage.getItem('id')})
        .then(res => {
          this.setState({students: res.data})
        })
        .catch(err => {console.log(err.data)})
  }

  render(){
    console.log(this.state.students)
    const { classes } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>学号</StyledTableCell>
              <StyledTableCell align="center">姓名</StyledTableCell>
              <StyledTableCell align="center">性别</StyledTableCell>
              <StyledTableCell align="center">学历</StyledTableCell>
              <StyledTableCell align="center">学院</StyledTableCell>
              <StyledTableCell align="center">专业</StyledTableCell>
              <StyledTableCell align="center">班级</StyledTableCell>
              <StyledTableCell align="center">联系电话</StyledTableCell>
              <StyledTableCell align="center">入学日期</StyledTableCell>
              <StyledTableCell align="center">在校状态</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.students.map((row,index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" >
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.sex}</TableCell>
                <TableCell align="center">{row.graduated}</TableCell>
                <TableCell align="center">{row.college}</TableCell>
                <TableCell align="center">{row.major}</TableCell>
                <TableCell align="center">{row.class}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{moment(row.entranceDate).format('YYYY-MM-DD')}</TableCell>
                {row.status === 0 ? (<TableCell align="center" className={classes.status0}>离校</TableCell>):(<TableCell align="center" className={classes.status1}>在校</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(style)(MyStudent);