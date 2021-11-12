const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mirim', // mysql 설치시 설정했던 비번
    database: 'dormbi_db', // db 이름
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        connection.end();
        throw err;
    } else {
        console.log("DB 접속 성공");
    }
});


module.exports = connection;