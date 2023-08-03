const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_PORT } = process.env;

const app = express();

mongoose.connect(DB_PORT)
  // eslint-disable-next-line no-console
  .then(() => console.log('Проверка данных'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error('Ошибка подключения', err));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
