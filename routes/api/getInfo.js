const express = require('express');
var router = express.Router();
var db = require("../../DBconnection");

router.post('/getStuInfo', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    //console.log(id);
    const sql = "SELECT * FROM student_info WHERE id=" + "'" + id + "'";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});
router.post('/getTeaInfo', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    //console.log(id);
    const sql = "SELECT * FROM teacher_info WHERE id=" + "'" + id + "'";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/getSomeStuInfo', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    //console.log(id);
    const sql = "SELECT id,name,phone,graduated,college,major,class FROM student_info WHERE id=" + "'" + id + "'";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/getSomeTeaInfo', (req, res) => {
    //console.log(id);
    const sql = "SELECT id,name,orientation FROM teacher_info";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/getMyStudent', (req, res) => {
    //console.log(id);
    const id = req.body.id;
    const sql = "SELECT * FROM tutor JOIN student_info on tutor.student_id= student_info.id WHERE teacher_id=" + "'" + id + "'";
    console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});


module.exports = router;