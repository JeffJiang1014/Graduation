import React, { Component } from 'react';
import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import TableHead from '@material-ui/core/TableHead';
import names from '../../model/teacher.json'
import Axios from 'axios';

const useStyles = {
  table: {
    minWidth: 650,
  },
};
const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 20,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

function createData(name, value) {
  return { name, value };
}

class Info extends Component {
  constructor(props){
    super(props);
    this.state = {
      info: {}
    }
  }
  UNSAFE_componentWillMount(){
    Axios.post("http://localhost:5000/api/getInfo/getTeaInfo",{id: sessionStorage.getItem('id')})
    .then(res => {
      this.setState({
          info: res.data[0],
      })
      //console.log(this.state.info)
     })
    .catch(err => console.log(err.data))
}
//console.log(rows)
//console.log(names['id']);

  render (){
    const { classes } = this.props;
    var rows = []
    //console.log(this.state.info)
    for(var i in this.state.info){
      rows.push(createData(i,this.state.info[i]));
    }
    return(
    <TableContainer component={Paper}>
      <Table className={classes.table}>
      <TableHead>
          <TableRow>
            <StyledTableCell>个人信息</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
              row.name!=='man' &&
            <StyledTableRow key={row.name}>
              <TableCell component="th" scope="row">
                {names[row.name]}
              </TableCell>
              <TableCell align="left">{row.name === 'entrance_time' || row.name ==='birthday' || row.name ==='graduate_time' ? moment(row.value).format('YYYY-MM-DD'):row.value}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
  }
}


export default withStyles(useStyles)(Info);
