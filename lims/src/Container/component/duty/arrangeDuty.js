import React, { Component } from 'react';
//import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
// import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//import RefreshIcon from '@material-ui/icons/Refresh'
import EditIcon from '@material-ui/icons/Edit'
import $ from 'jquery'
import { withStyles } from '@material-ui/styles';
import Axios from 'axios'
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  fab: {
    margin: '20px',
  },
  edit: {
    bottom: '-70px',
    left: '900px',
  },
}

class SimpleTooltips extends Component {
    constructor(props){
        super(props);
        this.state = {
            names: this.props.names,
            week: this.props.week,
            allNames: [],
            flag: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
       // console.log(this.state);
    }

    UNSAFE_componentWillMount(){
        Axios.post("http://localhost:5000/api/duty/getAllNames")
        .then(res => {
          for(var i in res.data)
            this.state.allNames.push(res.data[i].name) 
        })
        .catch(err => console.log(err.data));
      }

    onClick(){
        this.setState({flag: true});
        const newList = this.state.names;
        //console.log(this.state.allNames)
        var promise = new Promise(resolve => {
            //console.log(1);
            Axios.delete('http://localhost:5000/api/duty/delete')
            .then(res => {console.log("delete success")})
            .catch(err => {console.log(err.data)});
            resolve(newList);
            return promise;
        });
        promise.then(data => {
            //console.log(data);
            Axios.post('http://localhost:5000/api/duty/update',data)
            .then(res => {console.log("update success")})
            .catch(err => {console.log(err.data)});
        });
    }

    onChange(e,index){
        var items = this.state.names;
        items[index] = e.target.value;
        this.setState({names: items});
        //console.log(this.state.names);
    }

    disappear(){
        setTimeout(() => {
            $('#editModal').modal('hide');
            this.setState({flag: false});
            this.props.update(this.state.names);
        },1500)
    }
  //console.log(names)
  render(){
      //console.log(this.state.allNames);
    const { classes } = this.props;
    return (
        <div>
        <Tooltip title="修改" aria-label="edit" arrow placement="top">
            <Fab color="secondary" className={classes.edit} data-toggle="modal" data-target="#editModal" style={{outline:'none'}}>
              <EditIcon/>
            </Fab>
        </Tooltip>
        <div className="modal fade" id="editModal" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">值日重排</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                    {/* {console.log(this.state.names)} */}
                    {
                        this.state.names.map((name,index) => {
                            //console.log(name)
                            return(
                            <div className="input-group mb-3" key={index}>
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">{this.state.week[index]}</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01" value={name} onChange={(e) => this.onChange(e,index)}>
                                    {
                                        this.state.allNames.map((item,i) => {
                                            //console.log(item)
                                            return(
                                                <option value={item} key={i}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            )
                        })
                    }
                    </form>
                </div>
                { this.state.flag && <LinearProgress />}
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" className="btn btn-primary" onClick={()=>{this.onClick();this.disappear()}}>保存</button>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
  }
  
}
export default withStyles(styles)(SimpleTooltips);