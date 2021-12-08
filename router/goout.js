const express = require('express');
const router = express();
const connection = require('../mysql');

router.use(express.urlencoded({
    extended: false
  })); //application/x-www-form-urlencoded
  router.use(express.json());
  
router.get('/', function(req, res) {
    res.send('goout');
});

router.post('/list', function(req, res) {
    const num = req.body.StuNO;
    const name = req.body.StuName;
    const room = req.body.StuRoom;
    const start = req.body.startDay;
    const end = req.body.endDay;
    const tel = req.body.pTel;
    let today = new Date();
    const utcNow = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);
    const date = datetostring(koreaNow);
    var sql = 'insert into goout values(?, ?, ?, ?, ?, ?, ?)';
    let message, code;
    connection.query(sql, [num, name, room, start, end, tel, date], function(err, result) {
        if(err) {
            console.log(err);
            code = 400;
            message = "에러가 발생했습니다.";
        }
        else {
            code = 200;
            message = "외박일지 작성이 완료되었습니다.";
        }
        res.json({
            'code': code,
            'message': message
        })
    })
});

function datetostring(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let res = year + "-" + (month+1)+"-"+day;
    return res;
  }

module.exports = router;