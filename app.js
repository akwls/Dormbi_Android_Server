const express = require('express');
const app = express();
const path = require('path');

const userRouter = require('./router/user');
const washRouter = require('./router/wash');
const cleanRouter = require('./router/clean');
const gooutRouter = require('./router/goout');

app.use('/wash', washRouter);
app.use('/user', userRouter);
app.use('/clean', cleanRouter);
app.use('/goout', gooutRouter);

app.listen(3000, () => console.log('3000번 포트 대기'));