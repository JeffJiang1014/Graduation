//---------测试代码----------
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'labms'
});
 
connection.connect();
 
connection.query('SELECT * from login', function(err, data, fields) {
  if (err) {
    console.log(err);
    return;
  };
  
  console.log(JSON.parse(JSON.stringify(data)));
});
 
connection.end();