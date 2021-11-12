const express = require('express');
const bodyParser = require('body-parser');
const router = express();
//const bcrypt = require("bcryptjs");
const connection = require('../mysql');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.use(express.urlencoded({
  extended: false
})); //application/x-www-form-urlencoded
router.use(express.json());

router.get('/', function (req, res) {
  res.send('user');
});

router.get('/user', function (req, res) {
  res.send('user');
});

let user_test = {
  id : "admin",
  pw : "11111111",
  name : "admin",
  num: "1111",
  tel: "01011111111",
  ptel:"01022222222",
  loc : "서울"
}

//회원가입 기능 구현
router.post('/join', function (req, res) {
  //const user = req.body;
 const user = user_test;
  const salt = 10;
  //const password = bcrypt.hashSync(user.password, salt); // 비밀번호 암호화


  var sqlEmailCheck = 'select * from user where UserID = ?';
  connection.query(sqlEmailCheck, user.id, function (err, result) {
    if (result.length !== 0) {
      res.json({
        message: "이미 가입된 아이디입니다."
      })
    } else {
      connection.query(`INSERT INTO USER VALUES ('${user.id}', '${user.pw}', '${user.name}', '${user.num}', '${user.tel}', '${user.ptel}', '${user.loc}')`, function (err, result) {
        let resultCode = 404;
        let message = '에러가 발생했습니다';
        if (err)
          console.log(err);

        else {
          resultCode = 200;
          message = '회원가입에 성공했습니다.';
        }
        res.json({
          'code': resultCode,
          'message': message
        });
      })
    }
  });
});

/*
//로그인
router.post('/login', function (req, res) {
  const email = req.body.email;
  const pw = req.body.password;
  const sql = 'select * from user where email = ?';

  connection.query(sql, email, function (err, result) {
    let resultCode = 404;
    let message = '에러가 발생했습니다';
    let step;
    let stuName;
    let date;
    let rank_;
    let rank;
    let student_num;
    if (err)
      console.log(err);
    else {
      if (result.length === 0) {
        resultCode = 204;
        message = '가입하지 않은 계정입니다.';
      } else if (!(bcrypt.compareSync(pw, result[0].password))) {
        resultCode = 204;
        message = '비밀번호가 일치하지 않습니다.';
      } else {
        let rankSql = 'SELECT email, rank() over(order by step desc) AS ranking FROM user'
        connection.query(rankSql, function (err, ret) {
          console.log(ret);
          for (let i = 0;; i++) {
            if (ret[i].email === email) {
              rank_ = ret[i].ranking;
              break;
            }
          }
          console.log(result[0].date);
          resultCode = 200;
          message = '로그인 되었습니다.';
          step = result[0].step;
          student_num = result[0].student_num;
          stuName = result[0].name;
          date = result[0].date;
          rank = rank_;
          console.log('랭킹 : ', rank, rank_);
          res.json({
            'code': resultCode,
            'message': message,
            'step': step,
            'name': stuName,
            'student_num' : student_num,
            'rank': rank,
            'date': date
          });

        })
        
      }
    }
  })

});

router.get('/list', function (req, res) {
  let order = req.query.order;
  let sql;

  if (order == 0) sql = 'select student_num, name, step from user';
  else if (order == 1) sql = 'select student_num, name, step from user order by student_num ASC';
  else if (order == 2) sql = 'select student_num, name, step from user order by student_num DESC';
  else if (order == 3) sql = 'select student_num, name, step from user order by step DESC';

  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.json(result);
    console.log("result : " + JSON.stringify(result));
  });
});

router.post('/pass', function (req, res) {
  const email = req.query.email;
  const step = req.query.step;
  console.log(step);
  var sql = 'UPDATE user SET step = ? WHERE email = ?';
  let params = [step, email];
  connection.query(sql, params, function (err, result) {
    console.log("step : ", step);
    res.json({
      'step' : step
    })
  })
});

router.post('/update', function (req, res) {
  const email = req.query.email;
  const stuNum = req.query.student_num;
  const name = req.query.name;

  var sql = 'UPDATE user SET student_num = ?, name = ? WHERE email = ?';
  let params = [stuNum, name, email];

  if(stuNum === -1) {
    sql = 'UPDATE user SET name = ? WHERE email = ?';
    params = [name, email];
  }else if(name === 'x'){
    var sql = 'UPDATE user SET student_num = ? WHERE email = ?';
    params = [stuNum, email];
  }

  console.log(sql);
  console.log(params);
  
  connection.query(sql, params, function (err, result) {
    console.log("result : " + JSON.stringify(result));
    res.json({
      'message' : '정보가 변경되었습니다.'
    })
  })
});
*/
router.listen(3000); // port 
module.exports = router;