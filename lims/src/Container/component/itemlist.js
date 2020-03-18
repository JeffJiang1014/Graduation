import React, { Component } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

class ItemList extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: ''
        }
        console.log(this.props);
    }

    render(){
        //console.log(props.permission);
        return(
            <div>
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                    <ListItem button key={text}>
                    <ListItemIcon><MailIcon/></ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                {['All mail', 'Trash', 'Spam'].map((text) => (
                    <ListItem button key={text}>
                    <ListItemIcon><MailIcon/></ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </div>
        )
    }
}

export default ItemList;