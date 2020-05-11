const express = require('express');
var router = express.Router();
var db = require("../../DBconnection");

router.post('/getEquipment', (req, res) => {
    //console.log(req.body);
    //console.log(id);
    const sql = "SELECT * FROM equipment";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/myEquipment', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    //console.log(id);
    const sql = "SELECT a.number,a.owner_id,a.start_time,a.for_usage,b.type,b.name,b.manager_id,b.manager_name,b.phone FROM equipment_record as a JOIN equipment as b USING (number) WHERE (a.owner_id='" + id + "') AND (a.status=0) ORDER BY a.start_time";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/record', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    //console.log(id);
    const sql = "SELECT a.number,a.owner_id,a.start_time,a.end_time,a.for_usage,a.status,b.type,b.name,b.manager_id,b.manager_name,b.phone FROM equipment_record as a JOIN equipment as b USING (number) WHERE (a.owner_id='" + id + "') ORDER BY a.start_time";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});
router.post('/allrecord', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    //console.log(id);
    const sql = "SELECT a.number,a.owner_id,a.owner_name,a.owner_phone,a.start_time,a.end_time,a.for_usage,a.status,b.type,b.name,b.manager_id,b.manager_name,b.phone FROM equipment_record as a JOIN equipment as b USING (number) ORDER BY a.start_time";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

router.post('/return', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    const number = req.body.number;
    const time = req.body.time;
    //console.log(time);
    const sql = "UPDATE equipment_record SET status = 1, end_time ='" + time + "' WHERE owner_id=" + "'" + id + "' AND number=" + number;
    //console.log(sql);
    db.query(sql,function(results){
        db.query("UPDATE equipment SET status = 0 WHERE number="+number);
        res.json(results); 
    })  
});

router.post('/online', (req, res) => {
    //console.log(req.body);
    const number = req.body.number;
    //console.log(time);
    const sql = "UPDATE equipment SET status = 0 WHERE number=" + number;
    //console.log(sql);
    db.query(sql,function(results){
        res.json(results); 
    })  
});

router.post('/offline', (req, res) => {
    //console.log(req.body);
    const number = req.body.number;
    //console.log(time);
    const sql = "UPDATE equipment SET status = -1 WHERE number=" + number;
    //console.log(sql);
    db.query(sql,function(results){
        res.json(results); 
    })  
});

router.post('/application', (req, res) => {
    //console.log(req.body);
    const info = req.body.info;
    const usage = req.body.usage;
    const date = req.body.date;
    const number = req.body.number;
    const manager_id = req.body.manager_id;
    //console.log(info.id);
    const sql = "INSERT INTO application_equipment (id,name,graduated,phone,college,major,class,for_usage,start_time,status,number,manager_id,submit_time) VALUES ('"+info.id+"','"+info.name+"','"+info.graduated+"','"+info.phone+"','"+info.college+"','"+info.major+"','"+info.class+"','"+usage+"','"+date+"',0,'"+number+"','"+manager_id+"',NOW())";
    //console.log(sql);
    db.query(sql,function(results){
        res.json(results); 
    })  
});

router.post('/request', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    //console.log(time);
    const sql = "SELECT * FROM application_equipment WHERE manager_id='" +id+ "' GROUP BY id,number,status";
    //console.log(sql);
    db.query(sql,function(results){
        res.json(results); 
    })  
});

router.post('/refuse', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    const number = req.body.number;
    //console.log(time);
    const sql = "UPDATE application_equipment SET status = -1 WHERE number=" + number+" AND id='"+id+"'";
    //console.log(sql);
    db.query(sql,function(results){
        res.json(results); 
    })  
});

router.post('/accept', (req, res) => {
    //console.log(req.body);
    const id = req.body.id;
    const number = req.body.number;
    const time = req.body.time;
    const name = req.body.name;
    const phone = req.body.phone;
    const usage = req.body.usage;
    //console.log(time);
    const sql = "UPDATE application_equipment SET status = 1 WHERE number=" + number+" AND id='"+id+"'";
    //console.log(sql);
    db.query(sql,function(results){
        db.query("UPDATE equipment SET status = 1 WHERE number=" + number);
        const insert = "INSERT INTO equipment_record (number,owner_id,owner_name,owner_phone,start_time,for_usage,status) VALUES ('"+number+"','"+id+"','"+name+"','"+phone+"','"+time+"','"+usage+"',0)";
       // console.log(insert)
        db.query(insert);
        res.json(results); 
    })  
});

module.exports = router;