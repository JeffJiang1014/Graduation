const express = require('express');
var router = express.Router();
var db = require("../../DBconnection");

router.post('/add', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    const name = req.body.name;
    const skills = req.body.skills;
    const intro = req.body.intro;
    const tutor = req.body.tutor;
    const phone = req.body.phone;
    //console.log(id);
    const sql = "INSERT INTO application (id,name,intro,phone,skill,orientation_tutor,submit_time,status) VALUES ('"+id+"','"+name+"','"+intro+"','"+phone+"','"+skills+"','"+tutor+"',NOW(),0)";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/getApplication', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    //console.log(id);
    const sql = "SELECT * FROM application WHERE orientation_tutor='" +id+ "' GROUP BY id,status";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});


router.post('/refuse', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    const tutor = req.body.tutor;
    //console.log(time);
    const sql = "UPDATE application SET status = -1 WHERE orientation_tutor=" + tutor +" AND id='"+id+"'";
    //console.log(sql);
    db.query(sql,function(results){
        res.json(results); 
    })  
});



module.exports = router;