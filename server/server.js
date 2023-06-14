const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");


const salt = 10;

dotenv.config({
  path:'./.env'
});

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트 도메인을 여기에 설정
    methods: ['POST', 'GET'],
    credentials: true
  }));
app.use(cookieParser());

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database : process.env.DATABASE
})
  
db.connect((err)=>{
    if(err){console.log(err);
    } else {
        console.log("MYSQL Connection Success");
    }
});

app.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error from hassing password"});
        const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
        console.log(hash);
        const values = [
            req.body.name,
            req.body.email,
            hash
        ];
        db.query(sql, values, (err, result)=>{
            if(err) return res.json({Error: "Inserting data Error in server"});
            return res.json({Status : "Success"});
        })
    })
    
})

app.post('/login', (req, res) => {
    const sql = "SELECT email, password FROM login WHERE email=?";
    db.query(sql, req.body.email, (err, data) => {
        console.log(data);
        if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
                if(err) return res.json({Error: "Password compare error"});
                if(response){
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status : "Success"});
                } else {
                    return res.json({Error: "Password not matched"});
                }
            })
        } else {
            return res.json({Error: "No email existed"});
        }
    })
})

app.post('/add', (req, res) => {
  console.log('저장완료');
  // 입력한 값 가져오기
  var title = req.body.title;
  var content = req.body.content;
  var post_date = new Date();

  // 쿼리 작성
  var sql = "INSERT INTO board (title, content, post_date) VALUES (?, ?, ?)";
  var params = [title, content, post_date];

  // 쿼리 실행
  db.query(sql, params, (err, results) => {
    if (err) {
      console.log(err);
      res.send('Error occurred while adding data.');
    } else {
      console.log('데이터 추가 완료');

      // 새로운 쿼리 작성
      var selectSql = "SELECT * FROM board";

      // 쿼리 실행하여 데이터 조회
      db.query(selectSql, (err, rows) => {
        if (err) {
          console.log(err);
          res.send('Error occurred while retrieving data.');
        } else {
          console.log('데이터 조회 완료');

          // 데이터를 JSON 형식으로 클라이언트에 전송
          res.json(rows);
        }
      });
    }
  });
});
  
  app.get('/getPosts', (req, res) => {
    var selectSql = "SELECT * FROM board";
    db.query(selectSql, (err, rows) => {
      if (err) {
        console.log(err);
        res.send('Error occurred while retrieving data.');
      } else {
        console.log('데이터 조회 완료');
        res.json(rows);
      }
    });
  });
  

app.listen(5000, ()=>{
    console.log("Connectd to server");
})