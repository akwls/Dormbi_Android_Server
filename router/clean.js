const express = require('express');
const router = express();
const connection = require('../mysql');

router.use(express.urlencoded({
  extended: false
})); //application/x-www-form-urlencoded
router.use(express.json());

router.get('/', function (req, res) {
    res.send('clean');
});
    
router.get('/cleanlist/:start/:floor', function(req, res) {
    let start = req.params.start;
    let floor = req.params.floor;
    const sql = "select RoomNO, RoomNum, RoomFloor, CASE when RoomNum >= ? then '1' else '0' end NumPriority from ROOM where RoomFloor = ? order by NumPriority desc, RoomNum asc limit 7";
    connection.query(sql, [start, floor], function(err, result) {
        if(err) {
            return res.sendStatus(400); 
        }
        else {
            res.json(result);
        }
    });
});

router.get('/start/:floor/:month', function(req, res) {
    let month = req.params.month;
    let floor = req.params.floor;
    let sql;
    if(floor == 4) {
        sql = 'select start_4 from clean where month = ?';
        connection.query(sql, month, function(err, result) {
            if(err) {
                console.log(err);
            }
            else {
                res.json({
                    'start': result[0].start_4
                });
            }
        })
    }
    else if(floor == 5) {
        sql = 'select start_5 from clean where month = ?';
        connection.query(sql, month, function(err, result) {
            if(err) {
                console.log(err);
            }
            else {
                res.json({
                    'start': result[0].start_5
                });
            }
        })
    }
    
})


module.exports = router;