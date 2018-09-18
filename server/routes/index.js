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
var sql = 'SELECT * FROM users';
var addSql = 'INSERT INTO users(username,password) VALUES(?,?)';
var delSql = 'DELETE FROM users where username=?';

/* GET home page. */
router.get('/', function(req, res, next) {

  //查
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    result = JSON.parse(JSON.stringify(result));
    res.render('index', { title : result });
  });
});

router.post('/', function(req, res, next) {
  var userName = req.body.username;
  var passWord = req.body.password;
  var add = req.body.addUser;
  var del = req.body.delUser;
  var addSqlParams = [userName, passWord];
  var delSqlParams = [userName];
  if(add == '添加'){
    //增
    connection.query(addSql, addSqlParams, function(err, result){
      if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
       }        
  
      console.log('--------------------------INSERT----------------------------');
      //console.log('INSERT ID:',result.insertId);        
      console.log('INSERT ID:',result);        
      console.log('-----------------------------------------------------------------\n\n'); 
    });
  }
  else{
    //删
    connection.query(delSql, delSqlParams, function (err, result) {
      if(err){
        console.log('[DELETE ERROR] - ',err.message);
        return;
      }        

     console.log('--------------------------DELETE----------------------------');
     console.log('DELETE affectedRows',result.affectedRows);
     console.log('-----------------------------------------------------------------\n\n');  
    });
  }
  //查
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    result = JSON.parse(JSON.stringify(result));
    res.render('index', { title : result });
  });
});

module.exports = router;
