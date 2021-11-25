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
    
router.get('/cleanlist/:start', function(req, res) {
    let start = req.params.start;
    const sql = "select RoomNO, RoomNum, RoomFloor, CASE when RoomNum >= ? then '1' else '0' end NumPriority from ROOM order by NumPriority desc, RoomNum asc limit 7";
    connection.query(sql, start, function(err, result) {
        if(err) {
            return res.sendStatus(400); 
        }
        else {
            res.json(result);
        }
    });
});


module.exports = router;