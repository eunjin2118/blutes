const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv") 

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

app.listen(5000, ()=>{
    console.log("Connectd to server");
})