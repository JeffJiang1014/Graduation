const express = require('express');
var router = express.Router();
var db = require("../../DBconnection");
const isEmpty = require('../../validation/isEmpty')

router.post('/login', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    //console.log(id,password);
    const sql = "SELECT * FROM login WHERE id=" + "'" + id + "'";
    //console.log(sql);
    db.query(sql,function(results,fields){
        //console.log(results);
        if(isEmpty(results)){
            //console.log("用户名不存在");
            return res.status(404).json({id:'用户名不存在！'});
        }else{
            const login = results[0];
            //console.log(results.isEmpty); 
            //console.log(login);
            if(password!==login.pwd){
                //console.log("密码错误");
                return res.status(400).json({password:'密码错误！'});
            }
            else{
                res.json({msg:'success',permission:login.permission});
                //history.push("/manager_index",login.permission);  
            }
        }
        
    })  
});
module.exports = router;