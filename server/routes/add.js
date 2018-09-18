var express = require('express');
var router = express.Router();
var mysql  = require('mysql');  

var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'password',       
  port: '3306',                   
  database: 'world', 
});

connection.connect();
var  addSql = 'INSERT INTO users(username,password) VALUES(?,?)';

/* GET add listing. */
router.post('/', function(req, res, next) {
  
  /*处理浏览器同源策略问题*/
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var userName = req.body.username;
  var passWord = req.body.password;
  var addSqlParams = [userName, passWord];
  connection.query(addSql, addSqlParams, function(err, result){
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      console.log('添加失败');
      res.send('-1');
      return;
    }
    console.log('添加成功');
    res.send('1');
  });
});
module.exports = router;