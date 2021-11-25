const express = require('express');
const router = express();
const connection = require('../mysql');

router.use(express.urlencoded({
  extended: false
})); //application/x-www-form-urlencoded
router.use(express.json());

router.get('/', function (req, res) {
  res.send('wash');
});

router.get('/wash', function (req, res) {
  res.send('wash');
});

router.get('/washlist/:day', function(req, res) {
  let day = req.params.day;
  let sql = "select * from ROOM where WashDay = ?";
  connection.query(sql, day, function(err, result) {
    if(err) {
      return res.sendStatus(400); 
    }
    else {
      res.json(result);
      console.log("result : " + JSON.stringify(result));
    }
  })
});

router.get('/washlist/:day/:time/:date', function(req, res) {
  let day = req.params.day;
  let time = req.params.time;
  let date = req.params.date;
  let Roomsql = "select RoomNO, WashNum, WashTime from ROOM where WashTime = ? and WashDay = ? UNION select RoomNO, WashNum, WashTime from wash where WashTime = ? and date = ?";
  connection.query(Roomsql, [time,day,time, date], function(err, result) {
    if(err) {
      return res.sendStatus(400); 
    }
    else {
      res.json(result);
    }
  })
});


// 세탁기 예약
router.post('/reserve', function(req, res) {
  const room = req.body.RoomNO;
  const time = req.body.WashTime;
  const num = req.body.WashNum;
  let today = new Date();
  const date = datetostring(today);
  var sql = 'select * from wash where WashTime = ? and WashNum = ? and date = ?';
  connection.query(sql, [time, num, date], function(err, result) {
    let resultCode;
    let message;
    if(err) {
      console.log(err);         
      res.json({
        message: "세탁기 예약 오류 발생" 
      })
    }
    else {
      if(result.length > 0) {
        res.json({
          message: "이미 예약된 시간입니다."
        })
      }
      else {
        connection.query(`insert into wash values (${room}, ${num}, ${time}, "${date}")`, function(err, result) {
          resultCode = 400;
          message = "에러가 발생했습니다.";
          if(err) {
            console.log(err);
          }
          else {
            resultCode = 200;
            message = "세탁기 예약이 완료되었습니다.";
          }
          res.json({
            'code': resultCode,
            'message': message
          });
        })
      }
    }
  })
})


router.get('/reservelist/:date', function(req, res) {
  let date = req.params.date;
  let sql = "select * from wash where date = ?";
  connection.query(sql, [date], function(err, result) {
    if(err) {
      return res.sendStatus(400); 
    }
    else {
      res.json(result);
      console.log("result : " + JSON.stringify(result));
    }
  })
})


function datetostring(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let res = year + "-" + (month+1)+"-"+day;
  return res;
}

module.exports = router;
