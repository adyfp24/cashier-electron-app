const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*', 
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const authRoute = require('./server/routes/auth-route');
const productRoute = require('./server/routes/product-route');
const paymentRoute = require('./server/routes/payment-route');
const transactionRoute = require('./server/routes/transaction-route');
const recapRoute = require('./server/routes/recap-route');
const categoryRoute = require('./server/routes/category-route');
const settingRoute = require('./server/routes/setting-route');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authRoute);
app.use('/api', productRoute);
app.use('/api', paymentRoute);
app.use('/api', transactionRoute);
app.use('/api', recapRoute);
app.use('/api', categoryRoute);
app.use('/api', settingRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;

