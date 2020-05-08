const express = require('express');
var router = express.Router();
var db = require("../../DBconnection");

router.post('/getSeat', (req, res) => {
    const sql = "SELECT * FROM seat ORDER BY number";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/getStudents', (req, res) => {
    const sql = "SELECT id,name FROM student_info";
    db.query(sql,function(results){
        res.json(results); 
    })  
});

router.post('/delete', (req, res) => {
    const id = req.body.id;
    //console.log(req.body.id)
    const sql = "UPDATE seat SET id='', name='' WHERE id=" + "'" + id + "'";
    //console.log(sql)
    db.query(sql,function(results){
        res.json(results); 
    })  
});

router.post('/update', (req, res) => {
    const seat = req.body.seat;
    const id = req.body.id;
    const name = req.body.name;
    const sql = "UPDATE seat SET id='" + id + "', name='" + name + "' WHERE number =" + Number(seat);
    //console.log(sql);
    db.query(sql,function(results){
        res.json(results); 
    })  
});

module.exports = router;