import React, { Component } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import DeviceIcon from '@material-ui/icons/Devices'
import AccountIcon from '@material-ui/icons/AccountBox'
import DutyIcon from '@material-ui/icons/CalendarToday'
import ReasearchIcon from '@material-ui/icons/MenuBook'
import SeatIcon from '@material-ui/icons/EventSeat'
import {Link} from 'react-router-dom'

class ItemList extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: window.sessionStorage.getItem('permission'),
        }
    }

    render(){
        const au = this.state.permission;
        var pathforstudent = {
            pathname:'/student/info',
            state:this.props.info,
        }
        var pathforteacher = {
            pathname:'/teacher/info',
            state:this.props.info,
        }
        
        //console.log(this.props.info)
        // console.log(au)
        //console.log(window.sessionStorage.getItem('permission'));
        //console.log(props.permission);
        return(
            <div>
            { (au === '5' || au === '4') && (
                <div>
                    <List>
                        <ListItem button key="duty" component={Link} to='/duty'>
                            <ListItemIcon><DutyIcon/></ListItemIcon>
                            <ListItemText primary="值日安排" />
                        </ListItem>
                        <ListItem button key="seat"  component={Link} to='/seat'>
                            <ListItemIcon><SeatIcon/></ListItemIcon>
                            <ListItemText primary="我的座位"/>
                        </ListItem>
                        <ListItem button key="inform">
                            <ListItemIcon><MailIcon/></ListItemIcon>
                            <ListItemText primary="通知" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key="indiInfo" component={Link} to={pathforstudent}>
                            <ListItemIcon><AccountIcon/></ListItemIcon>
                            <ListItemText primary="个人信息" />
                        </ListItem>
                        <ListItem button key="sciInfo">
                            <ListItemIcon><ReasearchIcon/></ListItemIcon>
                            <ListItemText primary="我的科研" />
                        </ListItem>
                        <ListItem button key="devMan" component={Link} to='/myDevice'>
                            <ListItemIcon><DeviceIcon/></ListItemIcon>
                            <ListItemText primary="我的设备" />
                        </ListItem>
                    </List>
                </div>
            )}
            { (au === '2' || au === '3') && (
                <div>
                    <List>
                        <ListItem button key="duty" component={Link} to='/duty'>
                            <ListItemIcon><DutyIcon/></ListItemIcon>
                            <ListItemText primary="值日安排" />
                        </ListItem>
                        <ListItem button key="seat"  component={Link} to='/seat'>
                            <ListItemIcon><SeatIcon/></ListItemIcon>
                            <ListItemText primary="座位管理"/>
                        </ListItem>
                        <ListItem button key="inform">
                            <ListItemIcon><MailIcon/></ListItemIcon>
                            <ListItemText primary="通知" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key="indiInfo" component={Link} to={pathforteacher}>
                            <ListItemIcon><AccountIcon/></ListItemIcon>
                            <ListItemText primary="个人信息" />
                        </ListItem>
                        <ListItem button key="sciInfo">
                            <ListItemIcon><ReasearchIcon/></ListItemIcon>
                            <ListItemText primary="我的科研" />
                        </ListItem>
                        <ListItem button key="devMan" component={Link} to='/manageDevice'>
                            <ListItemIcon><DeviceIcon/></ListItemIcon>
                            <ListItemText primary="设备管理" />
                        </ListItem>
                    </List>
                </div>
            )}
            </div>
        )
    }
}

export default ItemList;