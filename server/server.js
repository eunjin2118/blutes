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


// 회원가입
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

// 로그인
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

// 게시판 글 작성한 데이터 전송
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

// 게시판 조회
app.get('/getPosts', (req, res) => {
  var selectSql = "SELECT id, title, DATE_FORMAT(post_date, '%Y-%m-%d') AS post_date, content FROM board"; // post_date를 YYYY-MM-DD 형식으로 가져옴
  db.query(selectSql, (err, rows) => {
    if (err) {
      console.log(err);
      res.send('데이터를 가져오는 중에 오류가 발생했습니다.');
    } else {
      console.log('데이터 조회 완료');
    }
  });
});

//게시물 1개 조회
app.get('/posts/:id', (req, res) => {
  const id = req.params.id
  var selectSql = `
    SELECT 
    b.id, b.title, DATE_FORMAT(b.post_date, '%Y-%m-%d') AS post_date, b.content as board_content, c.content as comment_content, c.nickname
    FROM board as b
    LEFT JOIN comments as c
    ON b.id = c.post_id
    WHERE b.id = ?;
  `; // post_date를 YYYY-MM-DD 형식으로 가져옴
  db.query(selectSql, [id], async (err, rows) => {
    if (err) {
      console.log(err);
      res.send('데이터를 가져오는 중에 오류가 발생했습니다.');
    } else {
      if(rows.length === 0) {
        res.json({ message: "데이터가 존재하지 않습니다." });
      } else {
        res.json({ result: rows })
      }
      console.log('데이터 조회 완료')
    }
  });
});

// 단어장
app.post('/addworld', (req, res) => {
  const sql = "INSERT INTO word (`word`, `meaning`, `sentence`, `date`) VALUES (?, ?, ?, ?)";
      const values = [
          req.body.word,
          req.body.meaning,
          req.body.sentence,
          req.body.date
      ];
      db.query(sql, values, (err, result)=>{
          if(err) return res.json({Error: "Inserting data Error in server"});
          return res.json({Status : "Success"});
      })
})

app.get('/getWords', (req, res) => {
    const sql = "SELECT word, meaning, sentence, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM word";
    db.query(sql, (err, result)=>{
      if(err) return res.json({Error: "Inserting data Error in server"});
      return res.json(result);
  })
})

app.post('/comments/:id', (req, res) => {
  const postId = req.params.id;
  const commentContent = req.body.comment;

  // 댓글 추가
  const insertSql = "INSERT INTO comments (post_id, content, nickname) VALUES (?, ?, ?)";
  const insertParams = [postId, commentContent, req.body.nickname]; // Assuming 'nickname' is sent in the request body

  db.query(insertSql, insertParams, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error occurred while adding comment.' });
    } else {
      console.log('댓글 추가 완료');
      res.status(200).json({ message: '댓글이 추가되었습니다.' });
    }
  });
});

// 검색 기능
app.get("/search", (req, res) => {
  let search = req.query.search;
  let title = req.query.title || "";
  console.log(`/search 시작`);
  //console.log("search 는" + search + "다");
  db.query(
    "SELECT * FROM board WHERE title LIKE ?",
    ["%" + search + "%", "%" + title + "%"],
    (err, results) => {
      if (err) {
        console.log("db select error" + err);
      } else {
        console.log(results);
        res.send(results);
      }
    }
  );
});

app.listen(5000, ()=>{
    console.log("Connectd to server");
})