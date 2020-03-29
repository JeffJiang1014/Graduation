import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import TableHead from '@material-ui/core/TableHead';
import names from '../model/student.json'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
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

export default function SimpleTable(props) {
  const rows = [];
  const classes = useStyles();
  const data = props.location.state;
  for(var i in data){
    rows.push(createData(i,data[i]))       
}
//console.log(rows)
console.log(names['id']);

  return (
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
              <TableCell align="left">{row.name === 'entranceDate' || row.name ==='birthday' ? moment(row.value).format('YYYY-MM-DD'):row.value}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
