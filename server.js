const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    next();
  });

const users = require('./routes/api/user');
const stuInfo = require('./routes/api/stuInfo');
const duty = require('./routes/api/duty');
app.use('/api/user', users);
app.use('/api/stuInfo',stuInfo);
app.use('/api/duty',duty);
app.listen(port, () => console.log(`Listening on port ${port}`));