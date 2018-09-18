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
var sql = 'SELECT * FROM blogs ORDER BY id DESC';

/* GET home page. */
router.get('/', function(req, res, next) {

  /*处理浏览器同源策略问题*/
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //查
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    result = JSON.parse(JSON.stringify(result));
    res.send(result);
  });
});
module.exports = router;