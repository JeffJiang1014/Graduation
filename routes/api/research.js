const express = require('express');
var router = express.Router();
var db = require("../../DBconnection");

router.post('/getResearch', (req, res) => {
    //console.log(id);
    const sql = "SELECT * FROM research";
    //console.log(sql);
    db.query(sql,function(results){
        //console.log(results);
        res.json(results); 
    })  
});

module.exports = router;