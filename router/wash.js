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



module.exports = router;
