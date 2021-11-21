const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require("bcrypt");
const router = express();

const connection = require('../mysql');

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

let user_join_test = {
  UserID : "admin",
  UserPW : "11111111",
  UserNAME : "김하진",
  UserNO: "2107",
  UserTEL: "01011111111",
  UserP_TEL:"01022222222",
  UserLOC : "서울"
}

//회원가입 기능 구현
router.post('/join', function (req, res) {
  const user = req.body;
  // const user = user_join_test;
  const salt = 10;
  const password = bcryptjs.hashSync(user.UserPW, salt); // 비밀번호 암호화
  var sqlIDCheck = 'select * from USER where UserID = ?';
  var sqlRoomCheck = 'select * from student where StuNO = ? && StuName = ?';
  var query = sqlIDCheck;
  

  connection.query(sqlIDCheck, user.UserID, function(err, result) {
    if (result.length !== 0) {
      res.json({
        message: "이미 가입된 아이디입니다."
      })
    }
    else {
      if(err) {
        console.log(err);
      }
      else {
        connection.query(sqlRoomCheck, [user.UserNO, user.UserNAME], function(err, result1) {
          if(result1.length !== 1) {
            res.json({
              message: "기숙사생 정보와 일치하지 않습니다."
            })
          }
          else {
            if(err) {
              console.log(err);
            }
            else {
              connection.query(`INSERT INTO USER VALUES ('${user.UserID}', '${password}', '${user.UserNAME}', ${user.UserNO}, '${user.UserTEL}', '${user.UserP_TEL}', '${user.UserLOC}')`, function (err, result2) {
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
          }
        });
      }
    }
  });
});

//로그인
router.post('/login', function (req, res) {
  const id = req.body.UserID;
  const pw = req.body.UserPW;
  // const id = user_join_test.UserID;
  // const pw = user_join_test.UserPW;
  var num, name, room, loc, washday, washtime, washnum, good, bad;
  var stusql = 'select * from student where StuNO = ?';
  var roomsql = 'select * from ROOM where RoomNO = ?';
  const login_sql = "select C.UserID, C.UserPW, C.UserNAME, C.UserNO, C.UserLOC, A.RoomNO, A.WashNum, A.WashDay, A.WashTime, B.good, B.bad from ROOM A, student B, USER C where C.UserID = ? && B.StuNO = C.UserNO && A.RoomNO = B.StuRoom";
  const sql = 'select * from USER where UserID = ?';
  connection.query(login_sql, id, function (err, result) {
    let resultCode = 404;
    let message = '에러가 발생했습니다';
    if (err)
      console.log(err);
    else {
      if (result.length === 0) {
        resultCode = 204;
        message = '가입하지 않은 계정입니다.';
      } else if (!(bcryptjs.compareSync(pw, result[0].UserPW))) {
        resultCode = 204;
        message = '비밀번호가 일치하지 않습니다.';
      } 
      else {
        resultCode = 200;
        message = '로그인 되었습니다.';
        num = result[0].UserNO;
        name = result[0].UserNAME;
        loc = result[0].UserLOC;
        room = result[0].RoomNO;
        washday = result[0].WashDay;
        washnum = result[0].WashNum;
        washtime = result[0].WashTime;
        good = result[0].good;
        bad = result[0].bad;

        res.json({
          'code': resultCode,
          'message': message,
          'num' : num,
          'name': name,
          'room': room,
          'loc' : loc,
          'washday': washday,
          'washtime': washtime,
          'washnum': washnum,
          'good': good,
          'bad': bad
        });
                
      }
    }
  })
});

// 상벌점 수정
router.post('/score', function(req, res) {
  const good = req.body.good;
  const bad = req.body.bad;
  const name = req.body.StuName;
  const num = req.body.StuNO;
  const sql = `update student set good = ${good}, bad = ${bad} where StuNO = ? && StuName = ?`;
  connection.query(sql, [num, name], function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
      res.json({
        'message' : '정보가 변경되었습니다.'
      })
    }
    
  })
})

module.exports = router;