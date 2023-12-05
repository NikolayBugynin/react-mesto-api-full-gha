require('dotenv').config();

const express = require('express');
const process = require('process');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validationLogin, validationCreateUser } = require('./validation/validation');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();
const { PORT = 3000 } = process.env;
const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors);
app.use(express.json());
app.use(requestLogger);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth); // защита всех роутеров авторизацией
app.use(routes);
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // центральный обработчик ошибок

app.listen(PORT);
