import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyDevice from './myDevice'
import Record from './record'
import ManageDevice from './manageDevice'
import AllDevices from './allDevices'
import RequestDevice from './requestDevice'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
          {(sessionStorage.getItem('permission') === '4' || sessionStorage.getItem('permission') === '5') &&<Tab label="我的设备" {...a11yProps(0)} />}
          {(sessionStorage.getItem('permission') === '2' || sessionStorage.getItem('permission') === '3') && (<Tab label="申领请求" {...a11yProps(0)} />)}
          <Tab label="领用记录" {...a11yProps(1)} />
          {/* {console.log(sessionStorage.getItem('permission')==='4')} */}
          {(sessionStorage.getItem('permission') === '4' || sessionStorage.getItem('permission') === '5') && (<Tab label="全部设备" {...a11yProps(2)} />)}
          {(sessionStorage.getItem('permission') === '2' || sessionStorage.getItem('permission') === '3') && (<Tab label="管理设备" {...a11yProps(2)} />)}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      {(sessionStorage.getItem('permission') === '4' || sessionStorage.getItem('permission') === '5') && (<MyDevice/>)}
      {(sessionStorage.getItem('permission') === '2' || sessionStorage.getItem('permission') === '3') && (<RequestDevice/>)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Record/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      {(sessionStorage.getItem('permission') === '4' || sessionStorage.getItem('permission') === '5') && (<AllDevices/>)}
      {(sessionStorage.getItem('permission') === '2' || sessionStorage.getItem('permission') === '3') && (<ManageDevice/>)}
      </TabPanel>
    </div>
  );
}
