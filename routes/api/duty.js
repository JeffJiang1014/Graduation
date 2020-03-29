const express = require('express');
var router = express.Router();
var db = require("../../DBconnection");

router.post('/getDuty', (req, res) => {
    const sql = "SELECT * FROM duty";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/getAllNames', (req, res) => {
    // const names = req.body.
    const sql = "SELECT name FROM stuinfo";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.delete('/delete',(req, res) => {
    const sql = "DELETE FROM duty LIMIT 6";
    //console.log(1)
    db.query(sql,function(results){
        //console.log(results);
        res.send("success"); 
    })
})

router.post('/update',(req, res) => {
    //console.log(req.body);
    //console.log(2);
    const names = req.body;
    var flag = false;
    var sql = 'insert into duty(name) values';
    for(var i in names){
        //console.log(i);
        if(i!=5)
            sql = sql + "('" + names[i] +"'),";
        else
        sql = sql + "('" + names[i] +"')";
        flag = true;
    }
    //console.log(sql);
    // const sql = "insert into duty(name) (select name from stuinfo order by rand() LIMIT 6)";
    if(flag)
        db.query(sql,function(results){
            //console.log(results);
            res.json(results); 
        })
})
module.exports = router;