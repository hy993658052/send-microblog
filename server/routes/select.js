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
var  selSql = 'SELECT * FROM users where username=?';

/* GET add listing. */
router.post('/', function(req, res, next) {
  
  /*处理浏览器同源策略问题*/
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var userName = req.body.username;
  var passWord = req.body.password;
  var selSqlParams = [userName];
  connection.query(selSql, selSqlParams, function(err, result){
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      res.send('-2');
      return;
    }
    result = JSON.stringify(result);
    console.log("查询结果:" + result);
    result = result.slice(1,-1);
    result = JSON.parse(result);
    if(result.password == ''){
        res.send('-1');
    }
    else if(result.password != passWord){
        res.send('0');
    }
    else{
        res.send('1');
    }
  });
});
module.exports = router;