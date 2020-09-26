require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const limiter = require('./configs/rate-limiter-config');
const { dataBase, dbOptions } = require('./configs/db-config');
const { errorHandler } = require('./modules/errorHandler.js');
const routes = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(dataBase, dbOptions);

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

module.exports = app;
