var mysql = require('mysql');
var dbConfig = require('./config/db'); //引入配置文件


module.exports = {
    query : function(sql,callback){
        //创建连接
        var connection = mysql.createConnection(dbConfig);        
        connection.connect(function(err){
            if(err){
                console.log('数据库链接失败');
                throw err;
            }
        connection.query( sql, function(err,results){
           if(err){
                console.log('数据操作失败');
                throw err;
            }
            if(JSON.stringify(results)!==undefined)
                callback && callback(JSON.parse(JSON.stringify(results)));
             connection.end(function(err){
                  if(err){
                      console.log('关闭数据库连接失败！');
                      throw err;
                  }
              });
           });
       });
    }
};