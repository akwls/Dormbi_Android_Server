const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello node');
})

app.listen(3000, () => console.log('3000번 포트에서 대기중'));